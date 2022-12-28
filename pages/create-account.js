/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useState} from 'react'
import {css, jsx} from '@emotion/react'
import Router from 'next/router'
import Layout from '../components/layout/Layout';
import {Form, Field, InputSubmit, Error,handleBlur} from '../components/ui/Form';

import fb from '../firebase';

//validations
import useValidation from '../hooks/useValidation';
import validateNewAccount from '../validation/validateNewAccount';

const INIT_STATE = {name: '', email: '', password:''}

const CreateAccount = () => {
  const [error,saveError] = useState(false);

  const {values,errors,handleSubmit,handleChange} = useValidation(INIT_STATE,validateNewAccount,createnewAccount)

  const {name, email, password} = values;


  async function createnewAccount() {
    try {
      await fb.createUser(name, email, password)
      Router.push('/');
    }
      catch(error) {
        console.error('There was some error creating your user', error.message);
        saveError(error.message)
      }
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
        >Sign in</h1>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Your email'
              name="email"
              value={email}
              onChange={handleChange}
              onBlur = {handleBlur}
            />
          </Field>
          {errors.email && <Error>{errors.email}</Error>}
          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Your password'
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Field>
          {errors.password && <Error>{errors.password}</Error>}
          {error && <Error>{error}</Error>}
          <InputSubmit
            type="submit"
            value="Create your account"
          />
        </Form>
      </>
    </Layout>
  </div>
)}

export default CreateAccount
