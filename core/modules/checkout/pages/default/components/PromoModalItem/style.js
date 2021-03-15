import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: GRAY_PRIMARY,
    },
    padding: {
        padding: theme.spacing(2),
    },
    carouselContainer: {
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 70,
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    carouselTitle: {
        marginBottom: '20px',
    },
}));

export default useStyles;
