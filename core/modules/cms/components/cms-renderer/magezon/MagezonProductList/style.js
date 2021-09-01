import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, WHITE } from '@theme_color';
import { CreateMargin } from '@theme_mixins';

const useStyles = makeStyles(() => ({
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
}));

export default useStyles;
