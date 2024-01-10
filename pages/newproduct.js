/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useState, useEffect, useContext} from 'react'
import {css, jsx} from '@emotion/react'
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader'
import Layout from '../components/layout/Layout';
import {Form, Field, InputSubmit, Error,handleBlur} from '../components/ui/Form';
import styled from '@emotion/styled';

import FirebaseContext from "../firebase/context"

import Error404 from '../components/layout/404';
import { getStorage, ref } from "firebase/storage";
//validations
import useValidation from '../hooks/useValidation';

import validateNewProduct from '../validation/validateNewProduct';

const INIT_STATE = {
  name: '',
  company: '',
  image:'',
  url: '',
  description:''
}

const Heading = styled.h1`
  color: red;
`

const NewProduct = () => {

  //images state
  const [imageObj, saveImageObj] = useState(null)
  const [imageName, saveImageName] = useState('');
  const [uploading, saveUploading] = useState(false);
  const [progress, saveProgress] = useState(0);
  const [urlImage, saveUrlImage] = useState ('');
  
  const [error,saveError] = useState(false);
  
  const {values,errors,handleSubmit,handleChange} = useValidation(INIT_STATE,validateNewProduct,createNewProduct);

  const {name, company, image, url, description} = values;

  // Routing hook for redirecting
  const router = useRouter();
  // context with crud operations from firebase
  const {user, firebase} = useContext(FirebaseContext);

  console.log(user);

  const handleUploadProductImage = (img,productRefId)=> {
    try {
      return firebase.uploadProductImage(img,productRefId);
    } catch (error) {
      handleUploadError(error);
    }
  }

  async function createNewProduct() {
    // if user not autenticated
    if (!user) {
      return Router.push('/login');
    }

    // create new product object
    let product = {
      name,
      company,
      url,
      image: '',
      description,
      votes: 0,
      comments: [],
      creationDate: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      },
      voted : []
    }

    // insert product in firestore database and its image in storage
    await firebase.addProductWithImage(product,imageObj);
    return Router.push('/')
  }
  // get reference to product images storage in firestore

  const handleUploadStart = () => {
    saveProgress(0);
    saveUploading(true);
  };
  const handleUploadError = error => {
    saveUploading(error);
    console.log(error);
  };
  
  return(
  <div>
    <Layout>
      {!user ? <Error404/> : (
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >New Product</h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>

              <legend>Info</legend>

              <Field>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='Name your product'
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur = {handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}

              <Field>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  placeholder='Name your Company'
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur = {handleBlur}
                />
              </Field>
              {errors.company && <Error>{errors.company}</Error>}

              <Field>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  onChange={e => saveImageObj(e.target.files[0])}
                />
              </Field>

              <Field>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur = {handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}

            </fieldset>

            <fieldset>

              <legend>About your product</legend>

              <Field>
              <label htmlFor="description">description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                onBlur = {handleBlur}
              />
            </Field>
            {errors.description && <Error>{errors.description}</Error>}

            </fieldset>

            {error && <Error>{error}</Error>}
            <InputSubmit
              type="submit"
            >
              Create product
            </InputSubmit>
          </Form>
        </>
      ) }
    </Layout>
  </div>
)}

export default NewProduct
