import React from 'react';
import styled from '@emotion/styled';
import {formatDistance, subDays} from 'date-fns';
import Link from 'next/link'

const Product = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const ProductDescription = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover {
        cursor: pointer;
    }    
`
const TextDescription = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`
const Comments = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1 rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;   
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Votes = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    
    div {
        font-size: 2rem;
    }
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const Image = styled.img`
  width: 200px;
`;

const ProductDetails = ({product}) => {
    const id = product.id
    const { comments, creationDate, description, company, name, url, image, votes} = product.data;

    return ( 
        <Product>
            <ProductDescription>
                <div>
                    <Image src={image}/>
                </div>
                <div>
                    <Link href="/products/[id]" as={`products/${id}`}>
                        <Title>{name}</Title>
                    </Link>
                    <TextDescription>{description}</TextDescription>
                    <Comments>
                        <div>
                            <img src="/static/img/comentario.png"/>
                            <p>{comments.length} comments</p>   
                        </div>
                    </Comments>
                    <p>Posted {formatDistance(subDays(new Date(creationDate), 3), new Date(), { addSuffix: true })}</p>
                </div>
            </ProductDescription>
            <Votes>
                <div>&#9650;</div>
                <p>{votes}</p>
            </Votes>
        </Product>
    );
}
 
export default ProductDetails;