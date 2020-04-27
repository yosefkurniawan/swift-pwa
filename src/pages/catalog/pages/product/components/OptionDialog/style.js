import { makeStyles } from '@material-ui/core';
import { GRAY_PRIMARY, WHITE, RED } from '@theme/colors';
import {
    CenterAbsolute,
    CreateBorder,
    CreatePadding,
    FlexColumn,
    CreateMargin,
    FlexRow,
} from '@theme/mixins';

export default makeStyles((theme) => ({
    dialog: {
        background: 'transparent',
    },
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'transparent',
    },
    bannerContainer: {
        height: '70vh',
        backgroundPosition: 'center',
        background: 'transparent',
    },
    img: {
        display: 'block',
        height: '70vh',
        width: 'auto',
    },
    optionContainer: {
        position: 'absolute',
        zIndex: 3,
        ...CenterAbsolute,
        backgroundColor: WHITE,
        width: '95%',
        height: 'auto',
        maxHeight: '60vh',
        borderRadius: 10,
        bottom: 0,
        ...CreateBorder('1px', '1px', 0, '1px', GRAY_PRIMARY),
        ...CreatePadding(15, 14, 60, 14),
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btnClose: {
        ...CreateMargin(0, 0, 15, 0),
    },
    label: {
        alignItems: 'center',
    },
    sizeContainer: {
        alignItems: 'center',
        ...CreateMargin(20, 0, 10, 0),
    },
    center: {
        justifyContent: 'center',
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
        ...CreatePadding(0, 20, 20, 20),
    },
    btnAddToCard: {
        ...CreateMargin(0, 8, 0, 0),
        width: '100%',
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
    error: {
        color: RED,
    },
    qty: {
        ...CreateMargin(15, 30, 15, 15),
    },
    select: {
        minWidth: '30%',
        width: 'auto',
        maxWidth: '75%',
    },
}));
