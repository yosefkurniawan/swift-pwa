/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

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

const Image = ({
    src,
    className = '',
    alt = 'Image',
    style = {},
}) => {
    // const styles = useStyles();
    const [imageSrc, setImageSrc] = React.useState('');
    const imageRef = React.useRef();

    const isVisible = (element) => {
        const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;
        const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
        const check = (position, base) => element.getBoundingClientRect()[position] >= 0 && element.getBoundingClientRect()[position] < base;
        const visibilityX = check('left', windowInnerWidth) || check('right', windowInnerWidth);
        const visibilityY = check('top', windowInnerHeight) || check('bottom', windowInnerHeight);
        // if (imageRef && imageRef.current && imageRef.current.alt === '/homepage/homepage-featured-categories/summer-style') {
        // console.log(element);
        // console.log(visibilityX && visibilityY);
        //     // console.log(element.getBoundingClientRect());
        //     // console.log(windowInnerWidth, windowInnerHeight);
        // }
        return visibilityX && visibilityY;
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
                    .img :global(.loaded) {
                        animation: loaded 300ms ease-in-out;
                    }
                `}
            </style>
            <img
                ref={imageRef}
                style={style}
                className={`img ${className}`}
                src={imageSrc}
                alt={alt}
                onLoad={(event) => event.target.classList.add('img-loaded')}
                // onError={(e) => {
                //     setLoaded(true);
                //     e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                // }}
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
