import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';
import {FirebaseContext} from '../firebase'
import ProductDetails from '../components/layout/ProductDetails';

const Heading = styled.h1`
  color: red;
`

const Home = () => {
  
  const [products, saveProducts] = useState([]);

  const {firebase} = useContext(FirebaseContext);

  function manageSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {

      return {
        id: doc.id,
        ...doc.data()
      }
    }
    )
  }

  useEffect(() => {
    const getProducts = async () => {
      const getproducts = await firebase.getProductsCollection()    
      saveProducts(getproducts)
    }
    getProducts();
  },[])

  return(
    <>
      <Layout>
        <div className='products_list'>
          <div className='container'>
            <div className='bg-white'></div>
            {products.map(product =>(
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
