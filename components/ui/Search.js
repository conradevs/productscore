/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import styled from '@emotion/styled';
import {css,jsx} from '@emotion/react';

const InputText = styled.input`
    border: 1px solid var(--grey3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 2px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;
const Search = () => {
    return ( 
        <form
            css={css`
                position: relative;
            `}
        >
            <InputText type="text"
                placeholder= "Search for products"
            />
            <InputSubmit type="submit">Search</InputSubmit>
        </form>
     );
}
 
export default Search;