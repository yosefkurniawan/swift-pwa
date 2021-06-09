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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            bottom: '0vh',
            width: '25vw',
            [theme.breakpoints.down('xs')]: {
                transform: 'rotate(90deg)',
                left: '-19vw',
                bottom: '30vh',
                width: '45vw',
            },
        },
    },
    recentlyBtnContent: {
        position: 'fixed',
        width: '15vw',
        height: '5vh',
        bottom: '440px',
        backgroundColor: 'white',
        left: 20,
        boxShadow: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '25vw',
            left: 40,
            [theme.breakpoints.down('sm')]: {
                width: '45vw',
                left: 20,
                bottom: '438px',
            },
        },
    },
    recentlyWrapperContent: {
        position: 'relative',
        height: '440px',
        paddingTop: '20px',
        overflowY: 'hidden',
    },
    contentFeatured: {
        display: 'flex',
        transition: '0.3s',
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            padding: 8,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    contentFeaturedOneSlide: {
        display: 'flex',
        transition: '0.3s',
        width: '28%',
        [theme.breakpoints.up('sm')]: {
            padding: 8,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}));

export default useStyles;
