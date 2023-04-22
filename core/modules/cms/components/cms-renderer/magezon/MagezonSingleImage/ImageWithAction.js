import { basePath } from '@config';
import Thumbor from '@common_image';

// eslint-disable-next-line object-curly-newline
const ImageWithAction = ({ onClick = () => null, url, classContainer, classImage, image_width, image_height, title, storeConfig, ...other }) => (
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
        onClick={onClick}
    >
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

export default ImageWithAction;
