import React from 'react';
import Cabecera from '../Cabecera';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <>
        <div>
            <Cabecera />
        </div>
        <main>{children}</main>
        </>
    )
}

export default Layout;