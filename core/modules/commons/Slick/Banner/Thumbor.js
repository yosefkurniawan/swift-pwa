import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import useStyles from './style';

const Image = ({
    className = '', alt = 'Image', lazy = false, src, srcMobile, width, height, widthMobile, heightMobile,
}) => {
    const styles = useStyles();
    const thumborLink = (_width, _height, _src) => `https://thumbor.sirclocdn.xyz/unsafe/${_width}x${_height}/filters:format(webp)/${_src}`;
    return (
        <div
            // ref={imgContainer}
            className={styles.thumborContainer}
        >
            {!lazy ? (
                <picture>
                    {srcMobile ? (
                        <source srcSet={thumborLink(widthMobile, heightMobile, srcMobile)} media={`(max-width: ${BREAKPOINTS.sm}px)`} />
                    ) : null}
                    <img
                        data-pagespeed-no-defer
                        className={classNames(styles.thumborImage, className)}
                        src={thumborLink(width, height, src)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.png';
                        }}
                        alt={alt}
                    />
                </picture>
            ) : null}
        </div>
    );
};

export default Image;
