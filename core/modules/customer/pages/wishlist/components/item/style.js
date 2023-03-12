import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE } from '@theme_color';
import { FlexColumn, FlexRow, Centering } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        ...FlexRow,
        alignItems: 'center',
        border: `1px solid ${GRAY_PRIMARY}`,
        [theme.breakpoints.up('md')]: {
            marginBottom: '15px',
        },
    },
    imgItem: {
        width: 127,
        ...Centering,
        height: 156,
        backgroundColor: WHITE,
        [theme.breakpoints.up('sm')]: {
            margin: '2px 0px',
        },
    },
    imgProduct: {
        width: 'auto',
        height: '100%',
    },
    content: {
        ...FlexColumn,
        alignItems: 'center',
        textAlign: 'center',
        width: '70%',
    },
    btnAdd: {
        marginTop: 10,
    },
    productTitle: {
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
}));

export default useStyles;
