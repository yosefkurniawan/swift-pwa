/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from 'react';

import { getUserFeed } from '@core_modules/cms/services/rest/instagram';

const WidgetInstagram = (props) => {
    const {
        feed_type, resolution, user_name, limit,
    } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const mount = useRef();
    const size = resolution === 'original' ? '100%' : `${resolution}px`;
    const limitData = limit === undefined ? 12 : limit;
    /**
     * [useEffect]
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const getInstagramFeed = async () => {
                if (feed_type === 'user') {
                    setLoading(true);
                    const dataInstagram = await getUserFeed(user_name, limitData);
                    setData(dataInstagram);
                    setLoading(false);
                }
            };

            getInstagramFeed();
        }

        return () => (mount.current = false);
    }, []);

    if (loading) return <div>Loading...</div>;

    // prettier-ignore
    return data.length < 1 ? 'not found images' : data.map((item) => (
        <a href={item.url} target="__blank">
            <img style={{ width: size }} src={item.src} alt={item.alt} />
        </a>
    ));
};

export default WidgetInstagram;
