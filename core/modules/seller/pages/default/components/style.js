import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE, GRAY_SECONDARY } from '@theme_color';
import {
    CreateMargin, CreatePadding, FlexRow, CenterAbsolute,
} from '@theme_mixins';
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
    tabContainer: {
        display: 'flex',
        marginBottom: '30px',
        '& h2': {
            padding: '16px 24px',
        },
        '& .makeStyles-bold': {
            borderBottom: '1px solid green',
        },
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
    skeletonWrapper: {
        padding: '0 0 12px 0',
        width: '100%',
        postion: 'relative',
        marginTop: '20px',
        '& .logo': {
            width: 100,
            top: 5,
            position: 'absolute',
            zIndex: 99,
            ...CenterAbsolute,
        },
        [theme.breakpoints.down('sm')]: {
            '& .MuiGrid-spacing-xs-2': {
                marginTop: 10,
            },
            marginTop: 0,
        },
    },
    imgColumn: {
        maxWidth: 450,
        maxHeight: 450,
        width: 'auto',
        height: 'auto',
    },
    videoContainer: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingTop: '56.25%', /* 16:9 ratio */
        '& .video-iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        },
    },
    etalaseContainer: {
        position: 'sticky',
        top: '140px',
        '& .etalase-content': {
            width: '100%',
            height: '350px',
            overflow: 'hidden',
            overflowY: 'auto',
            padding: 10,
            border: '1px solid #0000000d',
            borderRadius: 8,
            boxSizing: 'border-box',
            background: WHITE,
            boxShadow: '-2px 2px 5px 3px #0000000d',
            '&::-webkit-scrollbar': {
                width: '0.3em',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: WHITE,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#0000001A',
                borderRadius: '8px',
            },
            '& .MuiListItemIcon-root': {
                minWidth: 30,
            },
            '& .MuiListItem-root.Mui-selected': {
                '& span': {
                    fontWeight: 600,
                },
            },
        },
    },
    etalaseSelect: {
        padding: '0px 20px',
        '& .MuiFormControl-root': {
            minWidth: '100%',
        },
    },
}));
