import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';
import { CreateMargin, CreatePadding, FlexRow } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

export default makeStyles((theme) => ({
    sellerPaper: {
        [theme.breakpoints.up('xs')]: {
            ...CreateMargin(24, 24, 24, 24),
        },
        [theme.breakpoints.up('xm')]: {
            ...CreateMargin(36, 36, 36, 36),
        },
        [theme.breakpoints.up('sm')]: {
            ...CreateMargin(36, 36, 36, 36),
        },
        [theme.breakpoints.up('md')]: {
            ...CreateMargin(0, 48, 48, 48),
        },
    },
    sellerPanel: {
        [theme.breakpoints.up('xs')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '164px',
        },
        [theme.breakpoints.up('xm')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '164px',
        },
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '148px',
        },
        [theme.breakpoints.up('md')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '172px',
        },
        [theme.breakpoints.up('lg')]: {
            ...CreatePadding(36, 24, 36, 24),
            height: '172px',
        },
    },
    sellerProduct: {
        [theme.breakpoints.up('md')]: {
            ...CreateMargin(0, 48, 48, 48),
        },
    },
    sellerLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sellerLogo: {
        [theme.breakpoints.up('xs')]: {
            width: '64px !important',
            height: '64px !important',
            '& img': {
                height: '75% !important',
            },
        },
        [theme.breakpoints.up('xm')]: {
            width: '84px !important',
            height: '84px !important',
            '& img': {
                height: '75% !important',
            },
        },
        [theme.breakpoints.up('sm')]: {
            width: '84px !important',
            height: '84px !important',
            '& img': {
                height: '75% !important',
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '96px !important',
            height: '96px !important',
            '& img': {
                height: '75% !important',
            },
        },
    },
    sellerName: {
        paddingTop: '1rem',
    },
    sellerActionIcon: {
        [theme.breakpoints.up('xs')]: {
            fontSize: '1.25rem !important',
        },
        [theme.breakpoints.up('xm')]: {
            fontSize: '1.45rem !important',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.85rem !important',
        },
    },
    closePanelIcon: {
        position: 'absolute !important',
        right: '1rem',
        top: '0.5rem',
    },
    sellerInfoPanel: {
        '& .MuiDialog-paper': {
            [theme.breakpoints.up('xs')]: {
                minWidth: '300px',
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: '480px',
            },
            borderRadius: '0.75rem',
        },
    },
    sharePanel: {
        '& .MuiDialog-paper': {
            [theme.breakpoints.up('xs')]: {
                minWidth: '240px',
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: '360px',
            },
            borderRadius: '0.75rem',
        },
    },
    description: {
        paddingBottom: '1rem',
    },
    address: {
        paddingBottom: '1rem',
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 20, 0),
    },
    filterContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...CreatePadding(15, 15, 15, 15),
    },
    countProductText: {
        ...FONT_10,
        marginLeft: 20,
        paddingTop: 3,
    },
    filterBtnContainer: {
        justifyContent: 'flex-end',
        ...FlexRow,
        alignItems: 'center',
        fontSize: 12,
    },
    btnFilter: {
        marginRight: -20,
        padding: 0,
    },
    iconFilter: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconGrid: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconList: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    leftWrapperFilter: {
        ...FlexRow,
        ...CreatePadding(2, 0, 2, 0),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
    btnLoadmore: {
        cursor: 'pointer',
        width: '100%',
        padding: '20px',
        fontSize: '12px',
        background: '#fff',
        border: 'none',
        color: '#B4B4B4',
    },
    countProductTextDesktop: {
        justifyContent: 'flex-start',
        fontSize: 12,
        marginTop: -25,
    },
    divLoadMore: {
        width: '100%',
        textAlign: 'center',
        padding: 20,
    },
    hideDivLoadMore: {
        width: '100%',
        textAlign: 'center',
        padding: 20,
        visibility: 'hidden',
    },
}));
