import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme/colors';
import {
    Centering, FlexColumn, CreatePadding, CreateMargin,
} from '@theme/mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: WHITE,
    },
    caraousel: {
        padding: '0 55px',
        [theme.breakpoints.up('sm')]: {
            padding: '0 35vw',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 315px',
        },
    },
    slideContainer: {
        padding: '0 15px',
    },
    itemContainer: {
        width: 233,
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
    // ...CreateMargin(0,10,0,10)
    },
    imgItemContainer: {
        width: '100%',
        ...Centering,
        height: 288,
        background: 'transparent',
    },
    imgItem: {
        width: 'auto',
        height: '100%',
    },
    detailItem: {
        ...FlexColumn,
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        ...CreatePadding(16, 0, 0, 0),

    },
    title: {
        ...CreateMargin(0, 0, 15, 0),
        ...Centering,
    },
}));

export default useStyles;
