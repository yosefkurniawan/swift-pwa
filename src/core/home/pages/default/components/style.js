import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE } from '@theme/colors';
import {
    CreateMargin, CreatePadding, CenterAbsolute, Centering,
} from '@theme/mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
    },
    contentContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 70,
        [theme.breakpoints.up('sm')]: {
            width: 750,
        },
        [theme.breakpoints.up('md')]: {
            width: 970,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1170,
        },
    },
    features: {
        marginTop: 20,
        marginBottom: 30,
        maxHeight: '100%',
        maxWidth: '100%',
    },
    contentFeatured: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        borderRadius: 5,
        padding: 10,
    },
    footerFeatured: {
        paddingBottom: 10,
    },
    imgFeaturedContainer: {
        padding: 0,
    },
    imgFeatured: {
        width: '100%',
        maxHeight: '100%',
    },
    imgFeaturedItem: {
        width: '100%',
        ...Centering,
        backgroundColor: WHITE,
    },
}));

export default useStyles;
