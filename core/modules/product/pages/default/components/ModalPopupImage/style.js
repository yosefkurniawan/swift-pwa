import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';

export default makeStyles((theme) => ({
    wrapperDialog: {
        '& .MuiDialog-paperFullScreen': {
            [theme.breakpoints.down('sm')]: {
                background: 'rgba(0, 0, 0, 0.6)',
                justifyContent: 'center',
            },
        },
    },
    container: {
        position: 'relative',
        padding: '50px 20px 0px 20px',
        maxHeight: 900,
    },
    buttonClose: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: GRAY_SECONDARY,
        fontSize: '3rem',
        zIndex: theme.zIndex.drawer + 9,
    },
    actionZoom: {
        display: 'flex',
        position: 'absolute',
        left: '40%',
        top: -20,
        zIndex: theme.zIndex.drawer + 9,
        '& button': {
            fontSize: 28,
            background: '#fff',
            margin: '0px 4px',
            border: 'none',
            width: 38,
        },
    },
    buttonActionZoom: {
        margin: 10,
        color: GRAY_SECONDARY,
        fontSize: '3rem',
    },
}));
