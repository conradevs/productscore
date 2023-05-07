/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useState, useContext} from 'react'
import {css, jsx} from '@emotion/react'
import Router, {useRouter} from 'next/router'
import Layout from '../components/layout/Layout';
import {Form, Field, InputSubmit, Error,handleBlur} from '../components/ui/Form';
import styled from '@emotion/styled';
import {FirebaseContext} from '../firebase';

//validations
import useValidation from '../hooks/useValidation';

import validateNewProduct from '../validation/validateNewProduct';

const INIT_STATE = {
  name: '',
  company: '',
  //image:'',
  url: '',
  description:''
}

const Heading = styled.h1`
  color: red;
`

const NewProduct = () => {
  const [error,saveError] = useState(false);

  const {values,errors,handleSubmit,handleChange} = useValidation(INIT_STATE,validateNewProduct,createNewProduct);

  const {name, company, image, url, description} = values;

  // Routing hook for redirecting

  // context with crud operations from firebase
  const {user, firebase} = useContext(FirebaseContext);

  async function createNewProduct() {
    // if user not autenticated
    if (!user) {
      return Router.push('/login');
    }
    // create new product object
    const product = {
      name,
      company,
      url,
      description,
      votes: 0,
      comments: [],
      creationDate: Date.now()
    }

    // insert product in firestore database
    const newProductRef = await firebase.addProduct(product);
    //console.log('new product created with id ', newProductRef.id)
  }

  return(
  <div>
    <Layout>
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
                placeholder='Your name'
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

            {/*<Field>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                value={image}
                onChange={handleChange}
                onBlur = {handleBlur}
              />
            </Field>
            {errors.image && <Error>{errors.image}</Error>}
            */}
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
            value="Create product"
          />
        </Form>
      </>
    </Layout>
  </div>
)}

export default NewProduct
