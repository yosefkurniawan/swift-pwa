import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY } from '@theme_color';
import { FlexRow } from '@theme_mixins';

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
        // padding: theme.spacing(2),
    },
    carouselContainer: {
        padding: 20,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 70,
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    carouselTitle: {
        marginBottom: '20px',
    },
    freeItemContainer: {
        [theme.breakpoints.up('sm')]: {
            padding: 10,
        },
        [theme.breakpoints.up('md')]: {
            marginTop: -50,
        },
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default useStyles;
