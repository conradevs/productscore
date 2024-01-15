import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import {useRouter} from 'next/router';
import useProducts from '../hooks/useProducts';
import ProductDetails from '../components/layout/ProductDetails';

const Search = () => {

  const router = useRouter();
  const {query : {q}} = router;

  const {products} = useProducts('creationDate')
  const [result,useResult] = useState([]);

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter(product => {
      return (
        product.data.name.toLowerCase().includes(search)
      )
    })
    useResult(filter)

  },[q,products])

    return (
      <Layout>
        <div className='products_list'>
          <div className='container'>
            <div className='bg-white'></div>
              {result.map(product =>(
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))}
          </div>
        </div>
      </Layout>
  )
}

export default Search
 