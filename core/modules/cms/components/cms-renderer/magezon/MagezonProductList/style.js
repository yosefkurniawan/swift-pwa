import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, WHITE } from '@theme_color';
import { CreateMargin } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    btnShare: {
        margin: '0px !important',
    },
    iconShare: {
        color: PRIMARY,
        fontSize: 25,
        ...CreateMargin(0, 0, 0, 0),
    },
    btnCompare: {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        width: '120px',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            background: WHITE,
        },
    },
    btnAddToCart: {
        width: '100%',
        height: 41,
        color: WHITE,
        borderRadius: 100,
        [theme.breakpoints.down('576')]: {
            fontSize: 9,
            height: 31,
        },
    },
}));

export default useStyles;
