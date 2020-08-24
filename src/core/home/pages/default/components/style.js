import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE } from '@theme/colors';
import {
    CreateMargin, CreatePadding, CenterAbsolute, Centering, FlexColumn,
} from '@theme/mixins';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-arround',
        alignItems: 'center',
        ...CreatePadding(0, 0, 30, 0),
    },
    category: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...CreateMargin(30, 0, 30, 0),
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: GRAY_PRIMARY,
    },
    logo: {
        position: 'absolute',
        zIndex: 99,
        ...CenterAbsolute,
    },
    titleLogo: {
        fontWeight: 'bold',
        fontFamily: 'Playfair Display',
        color: WHITE,
    },
    imgLogo: {
        ...CreateMargin(15),
        width: 100,
        height: '100%',
    },
    skeletonWrapper: {
        padding: '12px 0',
        width: '100%',
    },
    skeleton: {
        marginBottom: '8px',
    },
    divMessage: {
        minHeight: 100,
        width: '100%',
        ...Centering,
    },
    labelCategory: {
        fontSize: 16,
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    features: {
        ...FlexColumn,
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
}));

export default useStyles;
