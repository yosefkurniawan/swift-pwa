import React from 'react';
import { getInstagramToken, getInstagramFeed } from '@core_modules/cms/services/graphql';
import { features } from '@config';
import { setLocalStorage, getLocalStorage } from '@helpers/localstorage';

const MagezonInstagramFeedCore = (props) => {
    const { View, ...other } = props;
    const key = features.magezon.keyStorage;
    const [feeds, setFeed] = React.useState([]);

    const [getData, responseData] = getInstagramFeed();

    const [getToken, { loading, data }] = getInstagramToken();

    React.useEffect(() => {
        const token = getLocalStorage(key);
        if (!token) {
            getToken();
        } else {
            getData({
                variables: {
                    token,
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (data && data.instagramToken && data.instagramToken.token) {
            setLocalStorage(key, decodeURIComponent(data.instagramToken.token));
            getData({
                variables: {
                    token: decodeURIComponent(data.instagramToken.token),
                },
            });
        }
    }, [data]);

    React.useEffect(() => {
        if (!responseData.loading && responseData.data && responseData.data.internalGetInstagramFeed
            && responseData.data.internalGetInstagramFeed.data) {
            setFeed(responseData.data.internalGetInstagramFeed.data);
        }
    }, [responseData]);

    if (loading || responseData.loading) return <h4>Loading</h4>;

    return (
        <View
            data={feeds}
            {...other}
        />
    );
};

export default MagezonInstagramFeedCore;
