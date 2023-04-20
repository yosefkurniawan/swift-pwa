import NextImage from 'next/image';
import { useLightbox } from 'simple-react-lightbox';

import { basePath } from '@config';
// import thumborLoader from '@helpers/imageLoader';
// import Thumbor from '@common_image';

// eslint-disable-next-line object-curly-newline
const ImageWithAction = ({ withPopup, onClick, url, classContainer, classImage, image_width, image_height, title }) => {
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
        <button
            type="button"
            className={classContainer}
            style={{
                position: 'relative',
                width: image_width ? `${image_width}px` : '100%',
                height: image_height ? `${image_height}px` : '100%',
                border: 'unset',
                background: 'unset',
            }}
            onClick={handleClick}
        >
            <NextImage
                className={classImage}
                // loader={thumborLoader}
                layout="fill"
                quality={80}
                src={url ?? `${basePath}/assets/img/placeholder.png`}
                alt={title}
            />
            {/* <Thumbor
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
            /> */}
        </button>
    );
};

export default ImageWithAction;
