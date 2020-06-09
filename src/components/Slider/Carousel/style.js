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
        padding: '0 40px',
        [theme.breakpoints.up('sm')]: {
            padding: '0 25vw',
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 320px',
        },
    },
    slideContainer: {
    },
    itemContainer: {
        width: '240px',
        margin: 'auto',
        height: '100%',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: '270px',
        },
        [theme.breakpoints.up('md')]: {
            width: '320px',
        },
    },
    imgItemContainer: {
        width: '100%',
        ...Centering,
        background: 'transparent',
    },
    imgItem: {
        width: '100%',
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
