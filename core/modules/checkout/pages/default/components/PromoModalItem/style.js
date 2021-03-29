import { makeStyles } from '@material-ui/core/styles';
import { GRAY_LIGHT, GRAY_PRIMARY } from '@theme_color';
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
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
        background: GRAY_LIGHT,
        position: 'sticky',
        top: 50,
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            top: 50,
            width: '100%',
        },
    },
    freeItemContainerMobileFixed: {
        [theme.breakpoints.up('sm')]: {
            padding: 10,
        },
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
        background: GRAY_LIGHT,
        position: 'sticky',
        top: 50,
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            top: 0,
            width: '100%',
        },
    },
}));

export default useStyles;
