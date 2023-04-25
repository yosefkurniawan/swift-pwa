import { useLightbox } from 'simple-react-lightbox';

import { basePath } from '@config';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';

// eslint-disable-next-line object-curly-newline
const ImageWithAction = ({ withPopup, onClick = null, url, alt_tag, position, storeConfig }) => {
    const { openLightbox } = useLightbox();
    const handleClick = () => {
        // eslint-disable-next-line no-unused-expressions
        onClick ? onClick() : null;
        if (withPopup) {
            setTimeout(() => {
                openLightbox(position - 1);
            }, 100);
        }
    };
    const enable = storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig.pwa.thumbor_https_http;
    const url_thumbor = storeConfig.pwa.thumbor_url;
    const src = url || `${basePath}/assets/img/placeholder.png`;
    const imageUrl = generateThumborUrl(src, 500, 500, enable, useHttpsOrHttp, url_thumbor);
    return (
        <button type="button" onClick={handleClick} style={{ border: 'unset', background: 'unset' }}>
            <source srcSet={imageUrl} type="image/webp" />
            <source srcSet={getImageFallbackUrl(imageUrl)} type="image/jpeg" />
            <img
                className="mgz-carousel-content-image"
                src={imageUrl}
                alt={alt_tag || 'magezon image'}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${basePath}/assets/img/placeholder.png`;
                }}
            />
        </button>
    );
};

export default ImageWithAction;
