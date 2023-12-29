import React, {useEffect, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import Layout from '../../components/layout/Layout'
import{FirebaseContext,fb} from '../../firebase';
import {getFirestore, collection, addDoc,doc,getDoc, updateDoc} from 'firebase/firestore';
import Error404 from '../../components/layout/404';
import {formatDistance, subDays} from 'date-fns';

import {css} from '@emotion/react'
import styled from '@emotion/styled';
import {Field, InputSubmit} from '../../components/ui/Form'

const ProductContainer = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`
const Product = () => {
    // component state
    const [product,useProduct] = useState({});
    const [error, saveError] = useState(false);
    // routing to get id
    const router = useRouter();
    const {query: {id}} = router;

    // firebase context
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const docRef = doc(firebase.db, "products", id);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())
                console.log(docSnap.id)
                if(docSnap.exists()) {
                    useProduct(docSnap.data())
                } else {
                    saveError(true)
                }
            }
            getProduct()
        }

    },[id]);

    if (Object.keys(product).length === 0) return(<p>Loading...</p>)
    const { comments, creationDate, description, company, name, url, image, votes} = product;
    return (
        <Layout>
            <>
                {error && <Error404/>}
                <div className="container">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                        
                    >{name}</h1>
                    <ProductContainer>
                        <div>
                            <p>Posted {formatDistance(subDays(new Date(creationDate), 3), new Date(), { addSuffix: true })}</p>
                            <img src={image}/>
                            <p>{description}</p>
                            <h2>New comment</h2>
                            <form>
                                <Field>
                                    <input
                                        type="text"
                                        name="message"
                                    />
                                </Field>
                                <InputSubmit
                                    type="sumbit"
                                    value="Add Comment"
                                />

                            </form>
                            <h2>Comments</h2>
                            {comments.map(comment => (
                                <li>
                                    <p>{comment.userName} said:</p>
                                    <p>{comment.name}</p>
                                </li>
                            ))}
                        </div>
                        <aside>
                            2
                        </aside>
                    </ProductContainer>
                </div>
            </>
        </Layout>
    );
}
 
export default Product;