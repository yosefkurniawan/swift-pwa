/* eslint-disable no-param-reassign */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

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

export default ThumborImage;
