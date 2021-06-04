import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 50,
        },
    },
    cookieRestriction: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#ffee9c',
        zIndex: 1500,
        ...CreatePadding(5, 15, 8, 18),
        color: '#303030',
    },
    recentView: {
        position: 'fixed',
        left: 20,
        bottom: 0,
        zIndex: 1400,
        backgroundColor: 'white',
        width: '15vw',
        height: '5vh',
        boxShadow: 'none',
        [theme.breakpoints.down('md')]: {
            bottom: '0vh',
            width: '25vw',
            left: 40,
            [theme.breakpoints.down('sm')]: {
                bottom: '6.5vh',
                width: '45vw',
                left: 20,
            },
        },
    },
    recentlyBtnContent: {
        position: 'fixed',
        width: '15vw',
        height: '5vh',
        bottom: '65vh',
        backgroundColor: 'white',
        left: 20,
        boxShadow: 'none',
        [theme.breakpoints.down('md')]: {
            width: '25vw',
            left: 40,
            [theme.breakpoints.down('sm')]: {
                width: '45vw',
                left: 20,
            },
        },
    },
    recentlyWrapperContent: {
        position: 'relative',
        height: '65vh',
        paddingTop: '20px',
    },
}));

export default useStyles;
