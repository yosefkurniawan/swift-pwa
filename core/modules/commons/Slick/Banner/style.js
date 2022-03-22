import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY } from '@theme_color';
import { Centering } from '@theme_mixins';
import { features } from '@config';

const generateSliderContainer = (width = features.imageSize.homeSlider.mobile.width, height = features.imageSize.homeSlider.mobile.height) => {
    let paddingTop;
    if (width < height) {
        if (width / height > 0.85 && width / height <= 0.9) {
            paddingTop = (width / height) * 135;
            return `${paddingTop}%`;
        } if (width / height > 0.8 && width / height <= 0.85) {
            paddingTop = (width / height) * 150;
            return `${paddingTop}%`;
        } if (width / height > 0.75 && width / height <= 0.8) {
            paddingTop = (width / height) * 175;
            return `${paddingTop}%`;
        } if (width / height > 0.7 && width / height <= 0.75) {
            paddingTop = (width / height) * 200;
            return `${paddingTop}%`;
        } if (width / height > 0.65 && width / height <= 0.7) {
            paddingTop = (width / height) * 225;
            return `${paddingTop}%`;
        } if (width / height >= 0.6 && width / height <= 0.65) {
            paddingTop = (width / height) * 250;
            return `${paddingTop}%`;
        }
        paddingTop = (width / height) * 275;
        return `${paddingTop}%`;
    }
    paddingTop = (height / width) * 150;
    return `${paddingTop}%`;
};

const useStyles = makeStyles((theme) => ({
    caraousel: {
        width: '100%',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
    },
    dots: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-arround',
        bottom: 33,
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    dotsItem: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: WHITE,
        margin: 5,
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: PRIMARY,
        width: 10,
        height: 10,
    },
    hide: {
        display: 'none',
    },
    imageSlider: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
    },
    imageSliderAuto: {
        [theme.breakpoints.up('sm')]: {
            width: 'auto !important',
        },
    },
    thumborContainer: {
        backgroundColor: '#eee',
        width: '100%',
        position: 'relative',
        paddingTop: generateSliderContainer(),
        // paddingTop: '175%',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            paddingTop: 0,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: WHITE,
        },
    },
    thumborImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            position: 'unset',
        },
    },
    arrow: {
        fontSize: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        ...Centering,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        paddingLeft: 10,
        top: 'calc(50% - 1rem)',
        width: 40,
        height: 40,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
        },
    },
    leftArrow: {
        left: 20,
    },

    rightArrow: {
        right: 20,
    },
    productVideo: {
        backgroundColor: '#eee',
        width: '100%',
        position: 'relative',
        paddingTop: '116%',
        marginTop: '0',
        '& iframe': {
            position: 'absolute',
            top: '0',
            height: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            paddingTop: 0,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: WHITE,
            marginTop: '-20px',
            '& iframe': {
                position: 'absolute',
                top: '0',
                height: '572px',
            },
        },
    },
}));

export default useStyles;
