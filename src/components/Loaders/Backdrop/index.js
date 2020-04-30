import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { loaderImage } from '@config';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    '@keyframes spiner': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    loader: {
        width: 70,
        height: 70,
        animationName: '$spiner',
        animation: '1.5s linear infinite',
    },
}));

const CustomBackdrop = ({ open, className }) => {
    const styles = useStyles();
    const backdroptStyle = classNames(styles.backdrop, className);
    let image;
    const extention = loaderImage.split('.').pop();
    if (extention === '' || !extention) {
        image = <img src={loaderImage} alt={loaderImage} />;
    } else if (
        extention === 'png'
        || extention === 'jpg'
        || extention === 'jpeg'
    ) {
        image = (
            <img
                className={styles.loader}
                src={loaderImage}
                alt={loaderImage}
            />
        );
    } else {
        image = <img src={loaderImage} alt={loaderImage} />;
    }
    return (
        <Backdrop className={backdroptStyle} open={open}>
            {!loaderImage || loaderImage === '' ? <CircularProgress /> : image}
        </Backdrop>
    );
};

CustomBackdrop.propTypes = {
    open: PropTypes.bool,
    className: PropTypes.string,
};

CustomBackdrop.defaultProps = {
    open: false,
    className: '',
};

export default CustomBackdrop;
