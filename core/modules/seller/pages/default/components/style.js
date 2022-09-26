import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';
import { CreateMargin, CreatePadding, FlexRow } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

export default makeStyles((theme) => ({
    sellerPaper: {
        [theme.breakpoints.up('xs')]: {
            ...CreateMargin(36, 0, 36, 0),
        },
        [theme.breakpoints.up('md')]: {
            ...CreateMargin(0, 0, 48, 0),
        },
    },
    sellerPanel: {
        [theme.breakpoints.up('xs')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '200px',
        },
        [theme.breakpoints.up('lg')]: {
            ...CreatePadding(36, 24, 36, 24),
            height: '172px',
        },
    },
    sellerLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sellerLogo: {
        width: '100px !important',
        height: '100px !important',
    },
    sellerName: {
        paddingTop: '1rem',
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
