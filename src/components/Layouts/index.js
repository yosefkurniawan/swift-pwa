import React from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';
import Router from 'next/router';
import { getToken } from '@helpers/token';
// Layout params:
// - pageConfig
// - CustomHeader (optional)
const Layout = (props) => {
    const {
        pageConfig, children, CustomHeader = false,
    } = props;

    if (pageConfig.withAuth) {
        if (typeof window !== 'undefined') {
            const token = getToken();
            console.log(token);
            if (token === '' || !token) {
                if (Router.route !== '/customer/account/login') Router.push('/customer/account/login');
            } else if (Router.route === '/customer/account/login') Router.push('/customer/account');
        }
    }


    return (
        <>
            {pageConfig.title && pageConfig.title !== '' && (
                <Head>
                    <title>
                        {pageConfig.title}
                    </title>
                </Head>
            )}

            {React.isValidElement(CustomHeader) ? (
                <>{React.cloneElement(CustomHeader, { pageConfig })}</>
            ) : (
                <Header pageConfig={pageConfig} />
            )}

            <main>{children}</main>
            <footer>
                <Navigation active={pageConfig.bottomNav} />
            </footer>
        </>
    );
};

export default Layout;
