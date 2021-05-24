import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    CreatePadding, FlexColumn, CreateMargin, Centering,
} from '@theme_mixins';
import {
    GRAY_THIRD,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 20,
        alignItems: 'center',
        ...CreatePadding(50, 50, 50, 50),
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 70px)',
            borderRadius: 0,
        },
    },
    card: {
        borderRadius: 15,
    },
    cardContent: {
        ...CreatePadding(30, 25, 30, 25),
    },
    formOtp: {
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            paddingTop: 0,
        },
    },
    desktopContainer: {
        marginBottom: 0,
    },
    btnLogin: {
        ...CreateMargin(16, 0, 10, 0),
    },
    footer: {
        zIndex: 0,
        width: '100%',
        ...CreatePadding(30, 30, 30, 30),
        ...Centering,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
    },
    selectLogin: {
        width: '100%',
        ...CreateMargin(0, 0, 15, -15),
    },
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    headerSpan: {
        paddingBottom: 10,
    },
    titleForm: {
        color: '#FF8E53',
    },
    subtitleForm: {
        color: GRAY_THIRD,
        fontSize: 14,
    },
    spanDivider: {
        height: 120,
    },
    spanLabel: {
        marginBottom: 20,
    },
    generalButton: {
        marginTop: 20,
    },
    title: {
        marginBottom: 50,
        marginLeft: 0,
        fontSize: 30,
        color: '#fff',
    },
}));
