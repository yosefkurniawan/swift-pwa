import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 50,
        },
    },
    cookieRestriction: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#ffee9c',
        zIndex: 1500,
        ...CreatePadding(5, 15, 8, 18),
        color: '#303030',
    },
}));

export default useStyles;
