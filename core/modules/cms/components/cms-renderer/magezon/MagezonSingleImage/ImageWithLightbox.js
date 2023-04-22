import React from 'react';
import { SimpleReactLightbox, SRLWrapper, useLightbox } from 'simple-react-lightbox';

import Thumbor from '@common_image';
import { basePath } from '@config';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';

import ImageWithAction from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage/ImageWithAction';

const ImageWithLighbox = ({
    classContainer,
    classImage,
    custom_src,
    hoverImage,
    image,
    imageCaption,
    image_width,
    image_height,
    isHover,
    popup_image,
    source,
    setIsHover,
    storeConfig,
    url,
}) => {
    const { openLightbox } = useLightbox();
    const [openPopup, setOpenPopup] = React.useState(false);

    const ligtboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
            showNextButton: false,
            showPrevButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    const popupImageUrl = React.useMemo(() => {
        if (custom_src) return custom_src;

        if (image && source === 'media_library') {
            if (popup_image) {
                return `${getStoreHost(getAppEnv())}media/${popup_image}`;
            }
            return `${getStoreHost(getAppEnv())}media/${image}`;
        }
        return `${basePath}/assets/img/placeholder.png`;
    }, [custom_src, image, popup_image, source]);

    const callbacks = {
        onLightboxClosed: () => {
            setIsHover(false);
            setOpenPopup(false);
        },
    };

    const handleClickImage = () => {
        setOpenPopup(!openPopup);
        setTimeout(() => {
            openLightbox();
        }, 100);
    };

    return (
        <SimpleReactLightbox>
            <div className={openPopup ? '' : 'hide'}>
                <SRLWrapper options={ligtboxSetting} callbacks={callbacks}>
                    <Thumbor
                        magezon
                        src={popupImageUrl}
                        className={classImage}
                        quality={80}
                        width={image_width ? image_width.replace('px', '') : ''}
                        height={image_height ? image_height.replace('px', '') : ''}
                        alt={imageCaption}
                        classContainer={classContainer}
                        onMouseOver={() => setIsHover(true)}
                        onMouseOut={() => setIsHover(false)}
                        storeConfig={storeConfig}
                    />
                </SRLWrapper>
            </div>
            {!openPopup && (
                <ImageWithAction
                    url={isHover ? hoverImage : url}
                    image_width={image_width ? image_width.replace('px', '') : ''}
                    image_height={image_height ? image_height.replace('px', '') : ''}
                    classImage={classImage}
                    title={imageCaption}
                    classContainer={classContainer}
                    onClick={handleClickImage}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}
                    storeConfig={storeConfig}
                />
            )}
        </SimpleReactLightbox>
    );
};

export default ImageWithLighbox;
