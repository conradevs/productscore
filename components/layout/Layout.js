/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import Header from './Header';
import {Global, css, jsx} from '@emotion/react';
import Head from 'next/head'
import Home from '../../pages';

const Layout = props => {
    return ( 
        <>
            <Global
                styles={css`
                    :root {
                        --grey: #3d3d3d;
                        --grey2: #6f6f6f;
                        --grey3: #e1e1e1;
                        --orange: #da552f;
                    }    
                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after{
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                    }
                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1, h2 {
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'PT Sans', sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                    }
                    img {
                        max-width: 100%;
                    }
                `}
            />
            <Head>
                <title>ProductStore</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
                <main>
                    {props.children}
                </main>
            
            
        </>
     );
}
 
export default Layout;