import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    Centering, CreatePadding, CenterAbsolute, FlexColumn, CreateMargin,
} from '@theme/mixins';
import { WHITE, PRIMARY } from '@theme/colors';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        ...Centering,
        ...CreatePadding(30, 30, 30, 30),
        ...FlexColumn,
        overflow: 'hidden',
    },

    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        background: 'rgba(255,255,255,0.7)',
        ...CreatePadding(20, 20, 20, 20),
    },
    btnContinue: {
        ...CreateMargin(0, 8, 0, 0),
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
        background: PRIMARY,
    },
    textBtn: {
        color: `${WHITE} !important`,
    },
    desktopFooter: {
        marginTop: 30,
    },
}));
