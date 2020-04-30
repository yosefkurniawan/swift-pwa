import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { loaderImage } from '@config';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const CustomBackdrop = ({ open, className }) => {
    const styles = useStyles();
    const backdroptStyle = classNames(styles.backdrop, className);
    return (
        <Backdrop className={backdroptStyle} open={open}>
            {!loaderImage || loaderImage === '' ? (
                <CircularProgress />
            ) : (
                <img src={loaderImage} alt={loaderImage} />
            )}
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
