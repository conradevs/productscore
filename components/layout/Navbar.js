import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return ( 
        <nav>
            <Link href = "/">Init</Link>
            <Link href = "/">Popular</Link>
            <Link href = "/">New Product</Link>
        </nav>
     );
}
 
export default Navbar;