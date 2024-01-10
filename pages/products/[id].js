import React, {useEffect, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import Layout from '../../components/layout/Layout'
import{FirebaseContext,fb} from '../../firebase';
import {doc,getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import Error404 from '../../components/layout/404';
import {formatDistance, subDays} from 'date-fns';

import {css} from '@emotion/react'
import styled from '@emotion/styled';
import {Field, InputSubmit} from '../../components/ui/Form'
import Button from '../../components/ui/Button';

const ProductContainer = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Product = () => {
    // component state
    const [product,useProduct] = useState({});
    const [error, saveError] = useState(false);
    const [comment, saveComment] = useState({});
    // routing to get id
    const router = useRouter();
    const {query: {id}} = router;

    // firebase context
    const {firebase,user} = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const docRef = doc(firebase.db, "products", id);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())
                if(docSnap.exists()) {
                    useProduct(docSnap.data())
                } else {
                    saveError(true)
                }
            }
            getProduct()
        }

    },[id, product.votes]);

    if (Object.keys(product).length === 0 && !error) return(<p>Loading...</p>)
    const { comments, creationDate, description, company, name, url, image, votes, voted, creator} = product;

    // Validate votes

    const voteProduct = () => {
        if(!user) {
            return router.push('/login')
        }
        console.log(product)
        // verify user didn't vote already
        if(voted.includes(user.uid)) return

        //save user id
        const newVoted = [...voted,user.uid]
        // get and count votes
        const newTotal = votes + 1;

        // update database
        const productRef = doc(firebase.db,'products', id);
        updateDoc(productRef,{
            votes: newTotal,
            voted: newVoted
        });
        // update state
        useProduct({
            ...product,
            votes: newTotal
        })
    }

    // Create comments functions
    const commentChange = e => {
        saveComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    // Is this comment from post creator
    const isCreator = id => {
        if(creator.id === id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();
        if(!user) {
            return router.push('/login')
        }
        // extra info
        comment.userId = user.uid;
        comment.userName = user.displayName;

        // Comments copy to array
        const newComments = [...comments, comment]
        
        // update database
        const productRef = doc(firebase.db,'products', id);
        updateDoc(productRef,{
            comments: newComments
        });
        // update state
        useProduct({
            ...product,
            comments: newComments
        })
    }

    // check if post creator is the same that is in current session
    const canDelete = () => {
        console.log(creator)
        if(!user) return false;
        if(creator.id === user.uid) {
            return true;
        }
    }

    // delete product from database
    const deleteProduct = async () => {
        if(!user) {
            return router.push('./login');
        }
        if(creator.id !== user.uid) {
            return router.push('./login');
        }
        try {
            // update database
            const productRef = doc(firebase.db,'products', id);
            await deleteDoc(productRef);
            router.push('/')
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <>
                {error ? <Error404/> : (
                    <div className="container">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}

                        >{name}</h1>
                        <ProductContainer>
                            <div>
                                <p>Posted {formatDistance(subDays(new Date(creationDate), 0), new Date(), { addSuffix: true })} by <b>{creator ? creator.name : 'unknown'}</b></p>
                                <p>This product was developed by <b>{company}</b></p>
                                <img src={image}/>
                                <p>{description}</p>
                                {user && (
                                    <>
                                        <h2>New comment</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    onChange={commentChange}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type="sumbit"
                                                value="Add Comment"
                                            >Add Comment</InputSubmit>

                                        </form>
                                    </>
                                )}
                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comments</h2>
                                {comments.length === 0 ? 'There are no comments' :  (
                                    <ul>
                                        {comments.map((comment,i) => (
                                            <li
                                                key={`${comment.userId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>
                                                    <b>
                                                        {comment.userName}
                                                        {isCreator(comment.userId) && 
                                                        ' (post creator) '
                                                        }said:
                                                    </b>
                                                </p>
                                                <p>{comment.message}</p>
                                                    
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >
                                    Visit URL
                                </Button>
                                <p css={css`
                                    text-align: center;
                                `}>{votes} Likes</p>
                                {user && (
                                    <Button
                                        onClick={voteProduct}
                                    >
                                        Vote
                                    </Button>
                                )}

                            </aside>
                        </ProductContainer>
                        {canDelete() &&
                            <Button
                                onClick={deleteProduct}
                            >Delete Product</Button>
                        }
                    </div>
                )}
                
            </>
        </Layout>
    );
}
 
export default Product;