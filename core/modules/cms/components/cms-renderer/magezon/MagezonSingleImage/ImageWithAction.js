import { useLightbox } from 'simple-react-lightbox';

import { basePath } from '@config';
import Thumbor from '@common_image';

// eslint-disable-next-line object-curly-newline
const ImageWithAction = ({ withPopup, onClick, url, classContainer, classImage, image_width, image_height, title, storeConfig, ...other }) => {
    const { openLightbox } = useLightbox();

    const handleClick = () => {
        onClick();
        if (withPopup) {
            setTimeout(() => {
                openLightbox();
            }, 100);
        }
    };

    return (
        <button type="button" onClick={handleClick} style={{ border: 'unset', background: 'unset' }}>
            <Thumbor
                magezon
                src={url ?? `${basePath}/assets/img/placeholder.png`}
                className={classImage}
                quality={80}
                width={image_width ? image_width.replace('px', '') : ''}
                height={image_height ? image_height.replace('px', '') : ''}
                alt={title}
                classContainer={classContainer}
                storeConfig={storeConfig}
                {...other}
            />
        </button>
    );
};

export default ImageWithAction;
