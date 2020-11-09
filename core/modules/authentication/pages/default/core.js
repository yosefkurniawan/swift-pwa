import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { setLogin, removeIsLoginFlagging } from '@helpers/auth';
import { expiredToken } from '@config';
import { setCartId, removeCartId } from '@helpers/cartId';
import { generateSession, deleteSession } from '../../services/graphql';
import Error from '../../components/Error';

const counter = 3; // seconds

const backToStore = () => {
    setTimeout(() => {
        window.location.replace('/');
    }, counter * 1000);
};

const Authentication = (props) => {
    const router = useRouter();

    const { Content, query, storeConfig } = props;
    const [authFailed, setAuthFailed] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const [generateSessionGql] = generateSession();
    const [deleteSessionGql] = deleteSession();

    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    let objectProps = {
        cartId: '',
        isLogin: false,
        redirect_path: '',
    };

    React.useEffect(() => {
        if (query.state) {
            const variables = {
                state: query.state,
            };

            // reset login and cart id first
            removeCartId();
            removeIsLoginFlagging();

            deleteSessionGql().then(() => {
                generateSessionGql({ variables }).then(({ data }) => {
                    const { result, cartId, isLogin } = data.internalGenerateSession;
                    if (result) {
                        objectProps = data.internalGenerateSession;
                        if (isLogin) {
                            // console.log('chekcout as logged-in customer');
                            setLogin(1, expired);
                        }
                        setCartId(cartId, expired);
                        if (objectProps && objectProps.redirect_path && objectProps.redirect_path !== '') {
                            router.push(objectProps.redirect_path);
                        } else {
                            router.push('/');
                        }
                    } else {
                        setAuthFailed(true);
                        setErrorMessage('Token has expired');
                        backToStore();
                    }
                }).catch(() => {
                    setAuthFailed(true);
                    backToStore();
                });
            }).catch(() => {
                setAuthFailed(true);
                backToStore();
            });
        }
    }, [query.state]);

    if (authFailed) {
        return (
            <>
                <Head>
                    <title>Loading...</title>
                </Head>
                <Error message={errorMessage} counter={counter} />
            </>
        );
    }

    return <Content />;
};

export default Authentication;
