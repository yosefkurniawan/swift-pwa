import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, GRAY_SECONDARY, PRIMARY, WHITE,
} from '@theme_color';
import {
    CenterAbsolute, Centering, CreateBorder, CreateMargin, CreatePadding, FlexColumn, FlexRow,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 !important',
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            ...FlexColumn,
        },
        position: 'relative',
        '& .customizable-container': {
            marginTop: 15,
        },
        '& .product-video': {
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            '& iframe': {
                height: 'auto',
                padding: 'auto 0',
            },
            [theme.breakpoints.up('sm')]: {
                '& iframe': {
                    height: '572px',
                },
            },
        },
    },
    headContainer: {
        position: 'relative',
        backgroundColor: WHITE,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
    },

    body: {
        ...CreatePadding(15, 30, 0, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),

        [theme.breakpoints.down('sm')]: {
            borderBottom: 'none',
        },
    },

    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        background: 'rgba(255,255,255,0.7)',
        // opacity : 0.7,
        ...CreatePadding(20, 20, 20, 20),
        zIndex: theme.zIndex.drawer + 1,
    },

    title: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 30,
        },
    },

    btnAddToCard: {
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },

    textBtnAddToCard: {
        fontSize: 16,
        color: `${WHITE} !important`,
    },

    titleContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titlePriceContainer: {
        ...FlexColumn,
        flex: 1,
        fontSize: 20,
        '& .price_text': {
            fontSize: 30,
        },
        [theme.breakpoints.down('sm')]: {
            '& .price_text': {
                fontSize: 18,
            },
        },
    },

    shareContainer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        flex: 1,
        '& > div': {
            textAlign: 'right !important',
        },
        [theme.breakpoints.down('sm')]: {
            '& button span': {
                fontSize: 9,
            },
        },
    },

    shareRootContainer: {
        ...CreatePadding(15, 30, 30, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40,
        },
    },

    btnShare: {
        margin: '0px !important',
    },

    iconShare: {
        color: PRIMARY,
        fontSize: 25,
        ...CreateMargin(0, 0, 0, 0),
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
    desktopShareIcon: {
        marginTop: 20,
    },
    desc: {
        ...CreateMargin(12, 0, 12, 0),
        textAlign: 'center',
    },
    ratingContainer: {
        ...FlexRow,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 16,
        },
    },
    priceTiersContainer: {
        ...FlexColumn,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 16,
        },
        '& > *': {
            flex: '0 0 100%',
            margin: '5px 0',
            fontSize: 12,
        },
    },
    btnLoadReview: {
        ...Centering,
        textAlign: 'center',
    },
    textLoadReview: {
        color: `${GRAY_SECONDARY} !important`,
    },
    sku: {
        alignItems: 'center',
        marginLeft: '0 !important',
    },
    tabs: {
        paddingTop: '40px',

        [theme.breakpoints.down('sm')]: {
            paddingTop: '140px',
        },
    },
    shareTitle: {
        marginTop: 20,
        fontSize: 12,
    },
    bannerProduct: {
        width: '99%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            height: '572px',
        },
    },
    bannerLiteTop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    bannerLiteTopMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    bannerLiteLabel: {
        ...CreatePadding(10, 0, 10, 0),
    },
    bannerLiteAfter: {
        ...CreatePadding(10, 0, 10, 0),
    },
    shareIcon: {
        width: '100%',
    },
    rowItem: {
        ...FlexRow,
        width: '350px',
    },
    itemShare: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: '5px',
        borderRight: `2px solid ${GRAY_PRIMARY}`,
    },
    compareChat: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '5px',
    },
    btnCompare: {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        marginRight: '5px',
    },
    btnChat: {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        marginLeft: '5px',
    },
    sellerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    imageContainer: {
        float: 'left',
        marginRight: 20,
    },
    img: {
        width: '60px',
        height: 'auto',
        borderRadius: '50%',
    },
    sellerLogo: {
        [theme.breakpoints.up('xs')]: {
            width: '64px !important',
            height: '64px !important',
            '& img': {
                height: '75% !important',
            },
        },
    },
}));

export default useStyles;
