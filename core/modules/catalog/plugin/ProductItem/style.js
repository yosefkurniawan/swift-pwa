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
        '& .btn-quick-view-list': {
            clear: 'both',
            background: 'transparent',
            border: 'none',
            fontWeight: 'bold',
            color: GRAY_THIRD,
            cursor: 'pointer',
            outline: 'none',
            display: 'block',
            marginTop: 15,
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
                boxShadow: '0px 3px 3px 1px rgba(0,0,0,0.15)',
            },
        },
    },
    listContainer: {
        width: '100%',
        display: 'flex',
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
    badgesNewSalesList: {
        position: 'absolute',
        width: '80%',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 5,
        zIndex: 1,
        ...FlexRow,
        justifyContent: 'space-between',
        padding: 15,
    },
    imgItem: {
        width: '100%',
        ...Centering,
        position: 'relative',
        '& .btn-quick-view': {
            position: 'absolute',
            zIndex: 2,
            clear: 'both',
            background: 'rgba(0,0,0, 0.3)',
            borderRadius: 5,
            padding: 5,
            border: 'none',
            fontWeight: 'bold',
            color: WHITE,
            cursor: 'pointer',
            outline: 'none',
            display: 'none',
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
            },
        },
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
    listImgItem: {
        flex: 0.3,
        ...Centering,
        position: 'relative',
        maxWidth: '80%',
        '& .btn-quick-view': {
            position: 'absolute',
            zIndex: 2,
            clear: 'both',
            background: 'rgba(0,0,0, 0.3)',
            borderRadius: 5,
            padding: 5,
            border: 'none',
            fontWeight: 'bold',
            color: WHITE,
            cursor: 'pointer',
            outline: 'none',
            display: 'none',
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                '& .btn-quick-view': {
                    display: 'inline-block',
                },
            },
        },
    },
    listDetailItem: {
        height: 'auto',
        position: 'relative',
        flex: 0.4,
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
