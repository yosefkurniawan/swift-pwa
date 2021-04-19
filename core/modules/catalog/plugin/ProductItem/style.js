import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, Centering, CreateMargin, ClearMarginPadding, FlexRow, CenterAbsolute,
} from '@theme_mixins';
import { GRAY_PRIMARY, PRIMARY, WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    container: {},
    itemContainer: {
        width: '100%',
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        ...CreatePadding(10, 10, 0, 10),
        ...CreateMargin(0, 0, 16, 0),
        position: 'relative',
        '& .MuiSkeleton-rect': {
            paddingBottom: '120%',
        },
        '& a': {
            cursor: 'pointer',
        },
    },
    badgesNewSales: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 5,
        borderRadius: 5,
        zIndex: 1,
        ...FlexRow,
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
    },
    imgItem: {
        width: '100%',
        ...Centering,
    },
    imgProduct: {
        width: '100%',
        height: '100%',
    },
    detailItem: {
        height: 'auto',
        paddingTop: 14,
        position: 'relative',
    },
    descItem: {
        ...FlexColumn,
        maxWidht: '80%',
        position: 'relative',
    },
    productTitle: {
        ...CreateMargin(0, 0, 5, 0),
    },
    btnFeed: {
        ...ClearMarginPadding,
        width: 20,
        height: 20,
        position: 'absolute',
        top: '0px',
        right: 5,
        textAlign: 'right',
    },
    productLinkButton: {
        maxWidth: 'calc(100% - 34px)',
    },
    iconFeed: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
    },
    iconActive: {
        color: PRIMARY,
    },
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
    feedContainer: {
        position: 'absolute',
        width: '20px',
        top: '-4px',
        right: '45px',
        textAlign: 'right',
    },
    btnAddToCart: {
        width: '100%', alignItems: 'center', paddingTop: 20, bottom: 0,
    },
    itemConfigurable: {
        width: '20px !important',
        height: '20px !important',
        ...CreateMargin(5, 5, 5, 5),
    },
    customBtnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
            height: 35,
        },
        [theme.breakpoints.up('sm')]: {
            ...CreateMargin(5, 5, 5, 5),
        },
        ...CreateMargin(0, 0, 0, 0),
        width: '100%',
        height: 30,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
        fontSize: 12,
    },
}));
