import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import useStyles from '@common_slick/Banner/style';
import { useEffect, useState } from 'react';
import { breakPointsUp } from '@helper_theme';

const generateSliderContainer = (width, height) => {
    let paddingTop;
    if (width < height) {
        if (width / height > 0.85 && width / height <= 0.9) {
            paddingTop = (width / height) * 135;
            return `${paddingTop}%`;
        } if (width / height > 0.8 && width / height <= 0.85) {
            paddingTop = (width / height) * 150;
            return `${paddingTop}%`;
        } if (width / height > 0.75 && width / height <= 0.8) {
            paddingTop = (width / height) * 175;
            return `${paddingTop}%`;
        } if (width / height > 0.7 && width / height <= 0.75) {
            paddingTop = (width / height) * 200;
            return `${paddingTop}%`;
        } if (width / height > 0.65 && width / height <= 0.7) {
            paddingTop = (width / height) * 225;
            return `${paddingTop}%`;
        } if (width / height >= 0.6 && width / height <= 0.65) {
            paddingTop = (width / height) * 250;
            return `${paddingTop}%`;
        }
        paddingTop = (width / height) * 275;
        return `${paddingTop}%`;
    }
    paddingTop = (height / width) * 150;
    return `${paddingTop}%`;
};

const BannerThumbnail = (props) => {
    const {
        className = '', alt = 'Image', lazy = false, src, srcMobile,
    } = props;

    let {
        width, height, widthMobile, heightMobile,
    } = props;

    if (typeof width === 'string') width = parseInt(width, 0);
    if (typeof height === 'string') height = parseInt(height, 0);
    if (typeof widthMobile === 'string') widthMobile = parseInt(widthMobile, 0);
    if (typeof heightMobile === 'string') heightMobile = parseInt(heightMobile, 0);

    const styles = useStyles();
    const imageUrl = generateThumborUrl(src, width, height);
    const mobileImageUrl = srcMobile ? generateThumborUrl(srcMobile, widthMobile, heightMobile) : null;
    const placeholderImage = '/assets/img/placeholder.png';
    const [imgSource, setImgSource] = useState(imageUrl);
    const [mobileImgSource, setMobileImgSource] = useState(mobileImageUrl);

    const desktop = breakPointsUp('sm');

    useEffect(() => {
        if (srcMobile) {
            const mobileImg = new Image();
            mobileImg.src = mobileImageUrl;
            mobileImg.onerror = () => setMobileImgSource(placeholderImage);
            mobileImg.onload = () => setMobileImgSource(mobileImageUrl);
        }

        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => setImgSource(placeholderImage);
        img.onload = () => setImgSource(imageUrl);
    }, [imageUrl, mobileImageUrl]);

    return (
        <div
            style={{ paddingTop: desktop ? 0 : generateSliderContainer(widthMobile, heightMobile) }}
            className={styles.thumborContainer}
        >
            {!lazy ? (
                <>
                    <picture>
                        {srcMobile ? (
                            <>
                                <source srcSet={mobileImgSource} media={`(max-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                                <source srcSet={getImageFallbackUrl(mobileImgSource)} media={`(max-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                            </>
                        ) : null}
                        <source srcSet={imgSource} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSource)} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                        <img
                            data-pagespeed-no-defer
                            className={classNames(styles.thumborImage, className)}
                            src={imgSource}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/img/placeholder.png';
                            }}
                            alt={alt}
                        />

                    </picture>
                </>
            ) : null}
        </div>
    );
};

export default BannerThumbnail;
