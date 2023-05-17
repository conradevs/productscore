import React from 'react'
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';

const Heading = styled.h1`
  color: red;
`

const NewProduct = () => (
  <>
    <Layout>
      <Heading>New Product</Heading>
    </Layout>
  </>
)

export default NewProduct
