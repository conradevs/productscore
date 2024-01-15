import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../firebase';
const useProducts = order => {
    const [products, saveProducts] = useState([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
      const getProducts = async () => {
        const getproducts = await firebase.getProductsCollection(order);
        const orderedProducts = getproducts.sort((p1,p2) => (p1.data[order]>p2.data[order]) ? -1 : 1);  
        saveProducts(orderedProducts)
      }
      getProducts();
    },[])

    return {
        products
    }
}

export default useProducts;