import React from 'react'
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

const Home = () => {
  
  const {products} = useProducts('creationDate');

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
