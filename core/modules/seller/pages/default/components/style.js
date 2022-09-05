import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreatePadding } from '@theme_mixins';

export default makeStyles((theme) => ({
    sellerPaper: {
        [theme.breakpoints.up('xs')]: {
            ...CreateMargin(36, 0, 36, 0),
        },
        [theme.breakpoints.up('md')]: {
            ...CreateMargin(0, 0, 48, 0),
        },
    },
    sellerPanel: {
        [theme.breakpoints.up('xs')]: {
            ...CreatePadding(24, 24, 24, 24),
            height: '200px',
        },
        [theme.breakpoints.up('lg')]: {
            ...CreatePadding(36, 24, 36, 24),
            height: '172px',
        },
    },
    sellerLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sellerLogo: {
        width: '100px !important',
        height: '100px !important',
    },
    sellerName: {
        paddingTop: '1rem',
    },
    closePanelIcon: {
        position: 'absolute !important',
        right: '1rem',
        top: '0.5rem',
    },
    sellerInfoPanel: {
        '& .MuiDialog-paper': {
            [theme.breakpoints.up('xs')]: {
                minWidth: '300px',
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: '480px',
            },
            borderRadius: '0.75rem',
        },
    },
    sharePanel: {
        '& .MuiDialog-paper': {
            [theme.breakpoints.up('xs')]: {
                minWidth: '240px',
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: '360px',
            },
            borderRadius: '0.75rem',
        },
    },
    description: {
        paddingBottom: '1rem',
    },
    address: {
        paddingBottom: '1rem',
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 20, 0),
    },
}));
