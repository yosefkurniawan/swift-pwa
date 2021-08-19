/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { generateThumborUrl } from '@helpers/image';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const ImageElement = (props) => {
    // prettier-ignore
    const {
        image, type, link,
        video_url, baseUrl,
        full_image, pauseSlick,
        height,
        fit,
        // caption, position,
    } = props;
    const videoCover = React.useRef();

    const videoUrl = video_url && video_url.split('=')[1];
    // prettier-ignore
    const imgUrl = type === 'link'
        ? link
        : type === 'media'
            ? full_image
                ? `${baseUrl}${full_image}`
                : `${baseUrl}${image}`
            : `${baseUrl}${image}`;

    if (type === 'link' || type === 'media') {
        return (
            <>
                <div className="mgz-img-gallery-img-container" onClick={pauseSlick}>
                    <img
                        data-pagespeed-no-defer
                        src={generateThumborUrl(imgUrl, 0, 0)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.png';
                        }}
                        alt="mediaimage"
                    />
                </div>
                <style jsx>
                    {`
                        .mgz-img-gallery-img-container {
                            // width: 100%;
                            // display: flex;
                            // flex: 1;
                            // justify-content: center;
                            // margin: auto;
                            text-align: center;
                            overflow: hidden;
                        }
                        img {
                            display: block;
                            width: 672px;
                            max-width: 100%;
                            height: ${height}px;
                            object-fit: ${fit === 'scaledown' ? 'scale-down' : fit};
                        }
                    `}
                </style>
            </>
        );
    }
    if (type === 'video') {
        return (
            <div className="mgz-img-slider-video-container">
                <div
                    ref={videoCover}
                    className="mgz-img-slider-video-cover"
                    onClick={() => {
                        videoCover.current.style.setProperty('display', 'none');
                    }}
                >
                    <PlayCircleOutlineIcon fontSize="large" />
                </div>
                <iframe
                    style={{ width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded Video"
                />
                <style jsx>
                    {`
                        .mgz-img-slider-video-container {
                            display: flex;
                            width: 100%;
                            position: relative;
                        }
                        .mgz-img-slider-video-cover {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            background-image: url(${imgUrl});
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-color: white;
                            background-position: center;
                        }
                        .mgz-img-slider-video-cover :global(svg) {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: white;
                            font-size: 60px;
                        }
                        .mgz-img-slider-video-cover:hover {
                            cursor: pointer;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default ImageElement;
