import Thumbor from '@common_image';
import { generateImageDimensions } from '@helpers/image';
import { useEffect, useRef } from 'react';

const PromoBannersLite = (props) => {
    const {
        src = '', imgSrc = '', alt = '', classes, type = 'top', storeConfig = {},
    } = props;
    let { width, height } = generateImageDimensions(imgSrc);
    const mount = useRef(null);

    const resizeImg = () => {
        let top = storeConfig?.pwa?.promo_banner_lite_top_width;
        let label = storeConfig?.pwa?.promo_banner_lite_label_width;
        let after = storeConfig?.pwa?.promo_banner_lite_after_width;

        top = typeof top === 'string' ? parseInt(top, 10) : top;
        label = typeof label === 'string' ? parseInt(label, 10) : label;
        after = typeof after === 'string' ? parseInt(after, 10) : after;

        let ratio = 1;

        if (type === 'top' && width > top.width) {
            ratio = (top.width / width);
        }
        if (type === 'label' && width > label.width) {
            ratio = (label.width / width);
        }
        if (type === 'after' && width > after.width) {
            ratio = (after.width / width);
        }
        width *= ratio;
        height = Math.floor(height * ratio);
    };

    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    useEffect(() => {
        if (mount.current) resizeImg();
    }, [imgSrc]);

    return (
        <div className={classes}>
            {src !== '' ? (
                <a href={src}>
                    <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
                </a>
            ) : (
                <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
            )}
        </div>
    );
};

export default PromoBannersLite;
