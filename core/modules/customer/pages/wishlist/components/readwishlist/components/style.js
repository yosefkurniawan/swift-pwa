import { makeStyles } from '@material-ui/core/styles';
import {
    CreatePadding,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
        ...CreatePadding(0, 0, 30, 0),
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
    },
    productItem: {
        width: 150,
    },
    productAction: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnWishlist: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'fit-content',
        },
    },
    footerWishlist: {
        width: '100%',
        marginTop: 15,
    },
    tableCellResponsiveProduct: {
        width: '50vw',
    },
}));

export default useStyles;
