/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

const Image = ({
    src,
    width = 500,
    height = 500,
    className = '',
    alt = 'Image',
    quality = 100,
    style = {},
    placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII=',
}) => {
    // const styles = useStyles();
    const [imageSrc, setImageSrc] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);
    const imageRef = React.useRef();

    function on(el, eventName, callback, opts) {
        opts = opts || false;
        if (el.addEventListener) {
            el.addEventListener(eventName, callback, opts);
        } else if (el.attachEvent) {
            el.attachEvent(`on${eventName}`, (e) => {
                callback.call(el, e || window.event);
            });
        }
    }

    function off(el, eventName, callback, opts) {
        opts = opts || false;
        if (el.removeEventListener) {
            el.removeEventListener(eventName, callback, opts);
        } else if (el.detachEvent) {
            el.detachEvent(`on${eventName}`, callback);
        }
    }

    const isVisible = (element) => {
        // const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;
        const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
        const check = (position, base) => element.getBoundingClientRect()[position] >= 0 && element.getBoundingClientRect()[position] < base;
        // const visibilityX = check('left', windowInnerWidth) || check('right', windowInnerWidth);
        const visibilityY = check('top', windowInnerHeight) || check('bottom', windowInnerHeight);
        console.log(element);
        console.log(element.getBoundingClientRect());
        // console.log(visibilityX);
        console.log(visibilityY);
        // return visibilityX && visibilityY;
        return visibilityY;
    };

    const listener = () => {
        if (!imageSrc && isVisible(imageRef.current)) {
            setImageSrc(src);
        }
    };

    React.useEffect(() => {
        listener();
        on(window, 'scroll', listener);
        on(window, 'resize', listener);
        return function cleanup() {
            off(window, 'scroll', listener);
            off(window, 'resize', listener);
        };
    }, []);

    return (
        <>
            <style jsx>
                {`
                    @keyframes loaded {
                        0% {
                            opacity: 0.1;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    .img:global(.img-loaded) {
                        animation: loaded 300ms ease-in-out;
                    }
                `}
            </style>
            <img
                ref={imageRef}
                // width={width}
                // height={height}
                style={style}
                className={`img ${className}`}
                src={
                    loaded && imageSrc
                        ? `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:quality(${quality})/${imageSrc}`
                        : placeholder
                }
                alt={alt}
                onLoad={(event) => {
                    setLoaded(true);
                    event.target.classList.add('img-loaded');
                }}
                onError={(e) => {
                    setLoaded(true);
                    e.target.onerror = null;
                    e.target.src = placeholder;
                }}
            />
        </>
    );
};

const ThumborImage = ({
    src, width = 500,
    height = 500,
    className = '',
    alt = 'Image',
    quality = 100,
    style = {},
}) => {
    const styles = useStyles();
    const [loaded, setLoaded] = React.useState(typeof window === 'undefined');
    return (
        <>
            <Skeleton variant="rect" width={width} height={height} style={{ display: loaded || typeof window === 'undefined' ? 'none' : 'block' }} />
            <img
                style={style}
                className={!loaded && typeof window !== 'undefined' ? styles.hideImage : className}
                src={`https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:quality(${quality})/${src}`}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    setLoaded(true);
                    e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                }}
            />
        </>
    );
};

export default Image;
