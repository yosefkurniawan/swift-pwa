import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, Centering, CreateMargin, ClearMarginPadding, FlexRow, CenterAbsolute,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, GRAY_THIRD, PRIMARY, WHITE,
} from '@theme_color';

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
    quickView: {
        '& .btn-quick-view': {
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 999,
            clear: 'both',
            background: 'transparent',
            border: 'none',
            fontWeight: 'bold',
            color: GRAY_THIRD,
            cursor: 'pointer',
            outline: 'none',
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
                boxShadow: '0px 5px 5px 2px rgba(0,0,0,0.3)',
            },
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
