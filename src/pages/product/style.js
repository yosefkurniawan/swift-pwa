import { makeStyles } from '@material-ui/core';
import {
    GRAY_PRIMARY, PRIMARY, WHITE, GRAY_SECONDARY,
} from '@theme/colors';
import {
    CenterAbsolute, CreateBorder, CreateMargin, CreatePadding, FlexColumn, FlexRow, Centering,
} from '@theme/mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        position: 'relative',
    },
    headContainer: {
        height: '70vh',
        position: 'relative',
        backgroundColor: GRAY_PRIMARY,
        width: '100%',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
    },

    body: {
        ...CreatePadding(15, 30, 30, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
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
    },
    btnAddToCard: {
        ...CreateMargin(0, 8, 0, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        ...CenterAbsolute,
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
    },

    shareContainer: {
        justifyContent: 'flex-end',
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
        ...CreateMargin(40, 0, 120, 0),
    },
    desc: {
        ...CreateMargin(12, 0, 12, 0),
        textAlign: 'center',
    },
    ratingContainer: {
        ...FlexRow,
    },
    btnLoadReview: {
        ...Centering,
    },
    textLoadReview: {
        color: `${GRAY_SECONDARY} !important`,
    },

}));

export default useStyles;
