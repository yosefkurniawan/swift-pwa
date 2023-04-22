import React from 'react';
import { SimpleReactLightbox, SRLWrapper, useLightbox } from 'simple-react-lightbox';

import { basePath } from '@config';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';
import CaraouselComponent from '@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel/components';
import PopupMapVideo from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage/PopupMapVideo';

import ImageWrapper from './ImageWrapper';
import { mapList, validatePx } from '../helpers/index';
import ImageWithAction from './ImageWithAction';

const ImageWithLightbox = ({
    hover_effect,
    items,
    overlay_color,
    owl_autoplay,
    owl_autoplay_speed,
    owl_autoplay_timeout,
    owl_autoplay_hover_pause,
    owl_auto_height,
    owl_center,
    owl_dots,
    owl_item_xs,
    owl_item_sm,
    owl_item_md,
    owl_item_lg,
    owl_item_xl,
    owl_loop,
    owl_lazyload,
    owl_nav,
    owl_rtl,
    owl_slide_by,
    owl_stage_padding,
    storeConfig,
    title,
}) => {
    const { openLightbox } = useLightbox();

    const [openPopup, setOpenPoup] = React.useState(false);
    const [openPopupMap, setOpenPopupMap] = React.useState(false);
    const [videoMap, setVideoMap] = React.useState('');

    const ligthboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    const callbacks = {
        onLightboxClosed: () => {
            setOpenPoup(false);
        },
    };

    const handleClickImage = (item) => {
        if (item.video_map) {
            setVideoMap(item.video_map);
            setTimeout(() => {
                setOpenPopupMap(!openPopup);
            }, 100);
            return;
        }

        setOpenPoup(!openPopup);
        setTimeout(() => {
            openLightbox(item.position - 1);
        }, 100);
    };

    const imageUrl = (item) => `${getStoreHost(getAppEnv())}media/${item.image}` || `${basePath}/assets/img/placeholder.png`;

    const popupImageUrl = (item) => `${getStoreHost(getAppEnv())}media/${item.popup_image || item.image}` || `${basePath}/assets/img/placeholder.png`;

    return (
        <>
            {openPopupMap && <PopupMapVideo open={openPopupMap} setOpen={() => setOpenPopupMap(false)} url={videoMap} title={title} />}
            <SimpleReactLightbox>
                <CaraouselComponent
                    data={mapList(items, owl_loop)}
                    slideXs={owl_item_xs}
                    slideSm={owl_item_sm}
                    slideMd={owl_item_md}
                    slideLg={owl_item_lg}
                    slideXl={owl_item_xl}
                    infinite={owl_loop}
                    rtl={owl_rtl}
                    centerMode={owl_center}
                    pauseOnHover={owl_autoplay_hover_pause}
                    autoplay={owl_autoplay}
                    autoplaySpeed={owl_autoplay_speed}
                    dots={owl_dots}
                    slidesToScroll={owl_slide_by}
                    speed={owl_autoplay_timeout}
                    adaptiveHeight={owl_auto_height}
                    arrows={owl_nav}
                    lazyLoad={owl_lazyload}
                    Item={({ item }) => (
                        <ImageWrapper hover_effect={hover_effect} item={item} overlay_color={overlay_color}>
                            <ImageWithAction
                                url={imageUrl(item)}
                                alt_tag={item.title || '' || 'magezon image'}
                                // eslint-disable-next-line no-nested-ternary
                                onClick={() => handleClickImage(item)}
                                withPopup={onclick === 'magnific' && !item.video_map}
                                position={item.position}
                                storeConfig={storeConfig}
                            />
                        </ImageWrapper>
                    )}
                    centerPadding={validatePx(owl_stage_padding)}
                />
                <div
                    style={{
                        display: openPopup ? 'hidden' : 'none',
                    }}
                >
                    <SRLWrapper options={ligthboxSetting} callbacks={callbacks}>
                        <CaraouselComponent
                            data={items}
                            infinite={false}
                            rtl={owl_rtl}
                            Item={(itemProp) => {
                                const { item } = itemProp;
                                return (
                                    <ImageWrapper hover_effect={hover_effect} item={item} overlay_color={overlay_color}>
                                        <img
                                            className="mgz-carousel-content-image"
                                            src={popupImageUrl(item)}
                                            alt={item.popup_title || item.title || ''}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${basePath}/assets/img/placeholder.png`;
                                            }}
                                        />
                                    </ImageWrapper>
                                );
                            }}
                        />
                    </SRLWrapper>
                </div>
            </SimpleReactLightbox>
        </>
    );
};

export default ImageWithLightbox;
