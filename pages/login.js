/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useState} from 'react'
import {css, jsx} from '@emotion/react'
import Router from 'next/router'
import Layout from '../components/layout/Layout';
import {Form, Field, InputSubmit, Error,handleBlur} from '../components/ui/Form';

import firebase from '../firebase';

//validations
import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';

const INIT_STATE = {email: '', password:''}

const Login = () => {
  const [error,saveError] = useState(false);

  const {values,errors,handleSubmit,handleChange} = useValidation(INIT_STATE,validateLogin,loginSubmit)

  const {email, password} = values;


  async function loginSubmit () {
    try {
     await firebase.login(email,password);
     Router.push('/');
    } catch (error) {
      console.log('There was an autentication error', error.message);
      saveError(error.message);
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
        >Login</h1>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
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
            value="Login" 
          />
        </Form>
      </>
    </Layout>
  </div>
)}

export default Login
