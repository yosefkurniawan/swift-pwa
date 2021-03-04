import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import useStyles from './style';

const Image = ({
    className = '', alt = 'Image', lazy = false, mobileImageUrl, imageUrl, widthMobile, heightMobile, widthDesktop, heightDesktop,
}) => {
    const styles = useStyles();
    const thumborLink = (width, height, src) => `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:format(webp)/${src}`;
    return (
        <div
        // ref={imgContainer}
            className={styles.thumborContainer}
        >
            {!lazy ? (
                <picture>
                    <source srcSet={thumborLink(widthDesktop, heightDesktop, imageUrl)} media={`(min-width: ${BREAKPOINTS.sm}px)`} />
                    <img
                        data-pagespeed-no-defer
                        className={classNames(styles.thumborImage, className)}
                        src={thumborLink(widthMobile, heightMobile, mobileImageUrl)}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                        alt={alt}
                    />
                </picture>
            ) : null}
        </div>
    );
};

export default Image;
