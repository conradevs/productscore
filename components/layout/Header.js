/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useContext} from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css,jsx} from '@emotion/react';
import Search from '../ui/Search';
import Navbar from './Navbar';
import Button from '../ui/Button';
import { FirebaseContext } from '../../firebase';

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;
 
const Header = () => {
    
    const {user, firebase} = useContext(FirebaseContext);

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--grey3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Search/>
                    <Navbar/>
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >   
                    {user ? (
                            <> 
                                <p
                                css={css`
                                    margin-right: 2rem;
                                `}
                                >          
                                    Hi: {user.displayName}</p>
                                <Button
                                    bgColor= "true"
                                    onClick={()=> firebase.logOut()}
                                >Log Out</Button>    
                            </>
                        ) : (
                            <>  
                                <Link href="/login">
                                    <Button
                                        bgColor= "true"
                                >Login</Button>
                                </Link>
                                <Link href="/create-account">
                                    <Button>Sign in</Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </HeaderContainer>
        </header> 
    );
}
 
export default Header;