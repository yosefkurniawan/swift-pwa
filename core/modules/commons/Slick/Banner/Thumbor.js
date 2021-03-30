import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import { generateThumborUrl } from '@helpers/image';
import useStyles from './style';

const Image = ({
    className = '', alt = 'Image', lazy = false, src, srcMobile, width, height, widthMobile, heightMobile,
}) => {
    const styles = useStyles();
    return (
        <div
            // ref={imgContainer}
            className={styles.thumborContainer}
        >
            {!lazy ? (
                <picture>
                    {srcMobile ? (
                        <source srcSet={generateThumborUrl(srcMobile, widthMobile, heightMobile)} media={`(max-width: ${BREAKPOINTS.sm}px)`} />
                    ) : null}
                    <img
                        data-pagespeed-no-defer
                        className={classNames(styles.thumborImage, className)}
                        src={generateThumborUrl(src, width, height)}
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
