import React from 'react';
import NextImage from 'next/image';
import Box from '@material-ui/core/Box';

import { basePath } from '@config';
import thumborLoader from '@helpers/imageLoader';

const CustomImage = ({
    src,
    width = 500,
    height = 500,
    magezon,
    classContainer = '',
    styleContainer: initStyleContainer = {},
    className = '',
    alt = 'preview',
    storeConfig = {},
    ...other
}) => {
    const [imgSrc, setImgSrc] = React.useState(src);

    let imageProps = { ...other };
    if (storeConfig?.pwa?.thumbor_enable) {
        const isIncludeHttpProtocol = !!storeConfig?.pwa?.thumbor_https_http;
        const loaderDefaultURL = storeConfig?.pwa?.thumbor_url || '';
        const loaderURL = isIncludeHttpProtocol ? loaderDefaultURL : loaderDefaultURL.replace(/https?:\/\//, '');

        imageProps = {
            ...imageProps,
            loader: (props) => thumborLoader({ ...props, loaderURL }),
        };
    }

    let styleContainer = {
        backgroundColor: '#eee',
        width: '100%',
        position: 'relative',
        paddingTop: `${(height / width) * 100}%`,
        overflow: 'hidden',
        display: 'block',
        ...initStyleContainer,
    };
    let styleImage = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        objectFit: 'cover',
    };

    if (magezon) {
        styleContainer = {
            width: 'fit-content',
            overflow: 'hidden',
            display: 'block',
        };
        styleImage = {
            maxWidth: '100%',
            maxHeight: '100%',
        };
    }

    React.useEffect(() => {
        if (src) {
            setImgSrc(src);
        }
    }, [src]);

    return (
        <Box className={classContainer} style={styleContainer} width={width} height={height}>
            <NextImage
                className={`img ${className}`}
                style={styleImage}
                src={imgSrc}
                alt={alt}
                layout="fill"
                objectFit="cover"
                onError={() => setImgSrc(`${basePath}/assets/img/placeholder.png`)}
                {...imageProps}
                {...other}
            />
        </Box>
    );
};

export default CustomImage;
