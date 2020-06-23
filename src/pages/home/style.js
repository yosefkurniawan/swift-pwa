import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE } from '@theme/colors';
import { CreateMargin, CreatePadding, CenterAbsolute } from '@theme/mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-arround',
        alignItems: 'center',
        ...CreatePadding(0, 0, 30, 0),
    },
    slider: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...CreateMargin(30, 0, 30, 0),
    },
    header: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },

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
}));

export default useStyles;
