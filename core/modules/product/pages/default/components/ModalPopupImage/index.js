/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Banner from '@common_slick/BannerThumbnail';
import ImageSlide from '@common_slick/Banner/ImageSlider';
import useStyles from '@core_modules/product/pages/default/components/ModalPopupImage/style';

const PopupImage = (props) => {
    const {
        open, setOpen, banner, storeConfig, selectedImgIdx,
    } = props;
    const styles = useStyles();

    return (
        <Dialog className={styles.wrapperDialog} fullScreen open={open} onClose={setOpen}>
            <IconButton className={styles.buttonClose} onClick={setOpen}>
                <Close color="inherit" fontSize="inherit" />
            </IconButton>
            <div className={classNames(styles.container, 'hidden-mobile')}>
                <Banner
                    data={banner}
                    noLink
                    thumbnail
                    showArrow
                    contentWidth="auto"
                    autoPlay={false}
                    width={960}
                    height={1120}
                    zoom
                    storeConfig={storeConfig}
                />
            </div>
            <div className="hidden-desktop" style={{ width: '100%', display: 'inline-block' }}>
                <div className={styles.container}>
                    <TransformWrapper>
                        {({ zoomIn, zoomOut, ...rest }) => (
                            <>
                                <div className={styles.actionZoom}>
                                    <button type="button" onClick={() => zoomIn()}>
                                        +
                                    </button>
                                    <button type="button" onClick={() => zoomOut()}>
                                        -
                                    </button>
                                </div>
                                <TransformComponent
                                    wrapperStyle={{ width: '100%' }}
                                    contentStyle={{ justifyContent: 'center', width: '100%' }}
                                >
                                    <ImageSlide
                                        width={960}
                                        height={1120}
                                        noLink
                                        key={selectedImgIdx}
                                        {...banner[selectedImgIdx]}
                                        videoUrl={banner[selectedImgIdx]?.videoUrl}
                                        storeConfig={storeConfig}
                                    />
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>
                </div>
            </div>
        </Dialog>
    );
};

export default PopupImage;
