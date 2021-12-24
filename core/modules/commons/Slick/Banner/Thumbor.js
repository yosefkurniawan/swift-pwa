import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import useStyles from '@common_slick/Banner/style';
import { useEffect, useState } from 'react';

const BannerThumbnail = ({
    className = '', alt = 'Image', lazy = false, src, srcMobile, width, height, widthMobile, heightMobile,
}) => {
    const styles = useStyles();
    const imageUrl = generateThumborUrl(src, width, height);
    const mobileImageUrl = srcMobile ? generateThumborUrl(srcMobile, widthMobile, heightMobile) : null;
    const placeholderImage = '/assets/img/placeholder.png';
    const [imgSource, setImgSource] = useState(imageUrl);
    const [mobileImgSource, setMobileImgSource] = useState(imageUrl);

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
        <div className={styles.thumborContainer}>
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
