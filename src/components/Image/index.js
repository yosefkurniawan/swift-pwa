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
}) => {
    const styles = useStyles();
    const [imageSrc, setImageSrc] = React.useState('');
    const imgContainer = React.useRef();

    function addEventListener(el, eventName, callback, opts) {
        if (el.addEventListener) {
            el.addEventListener(eventName, callback, opts || false);
        } else if (el.attachEvent) {
            el.attachEvent(`on${eventName}`, (e) => {
                callback.call(el, e || window.event);
            });
        }
    }

    function removeEventListener(el, eventName, callback, opts) {
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
        if (!imageSrc && isVisible(imgContainer.current)) {
            setImageSrc(src);
        }
    };

    React.useEffect(() => {
        listener();
        addEventListener(window, 'scroll', listener);
        addEventListener(window, 'resize', listener);
        return function cleanup() {
            removeEventListener(window, 'scroll', listener);
            removeEventListener(window, 'resize', listener);
        };
    }, []);

    return (
        <>
            <style jsx>
                {`
                    @keyframes loaded {
                        0% { opacity: 0.1; }
                        100% { opacity: 1; }
                    }
                    .img {
                        animation: loaded 300ms ease-in-out;
                    }
                `}
            </style>
            <div
                ref={imgContainer}
                style={{
                    backgroundColor: '#eee',
                    width: '100%',
                    position: 'relative',
                    paddingTop: `${(height / width) * 100}%`,
                }}
            >
                {
                    imageSrc
                        ? (
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                }}
                                className={`img ${className}`}
                                src={`https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:quality(${quality})/${imageSrc}`}
                                alt={alt}
                            />
                        )
                        : null // for placeholder (will improve later)
                }
            </div>
        </>
    );
};

export default Image;
