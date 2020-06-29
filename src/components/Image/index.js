/* eslint-disable no-unused-vars */
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
        if (el.addEventListener) {
            el.addEventListener(eventName, callback, opts || false);
        } else if (el.attachEvent) {
            el.attachEvent(`on${eventName}`, (e) => {
                callback.call(el, e || window.event);
            });
        }
    }

    function off(el, eventName, callback, opts) {
        if (el.removeEventListener) {
            el.removeEventListener(eventName, callback, opts || false);
        } else if (el.detachEvent) {
            el.detachEvent(`on${eventName}`, callback);
        }
    }

    const isVisible = (element) => {
        const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
        const check = (position, base) => element.getBoundingClientRect()[position] >= 0 && element.getBoundingClientRect()[position] < base;
        const visibilityY = check('top', windowInnerHeight) || check('bottom', windowInnerHeight);
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
                        animation: loaded 3000ms ease-in-out;
                    }
                `}
            </style>
            <img
                ref={imageRef}
                style={{ ...style, ...(!imageSrc && { height: '200px' }) }}
                className={`img ${className}`}
                src={
                    imageSrc
                        ? `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:quality(${quality})/${imageSrc}`
                        : placeholder
                }
                alt={alt}
                onLoad={(e) => {
                    // setLoaded(true);
                    if (imageSrc) e.target.classList.add('img-loaded');
                }}
                onError={(e) => {
                    // setLoaded(true);
                    e.target.onerror = null;
                    e.target.src = placeholder;
                }}
            />
        </>
    );
};

export default Image;
