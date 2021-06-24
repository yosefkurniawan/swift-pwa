import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexRow } from '@root/core/theme/mixins';
import { GREEN, PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        marginTop: 30,
        ...FlexRow,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 20,
        },
    },
    btnCancel: {
        marginRight: 20,
        background: PRIMARY,
        '&:hover': {
            background: PRIMARY,
            color: PRIMARY,
        },
    },
    btnPlaceOrder: {
        background: GREEN,
        '&:hover': {
            background: GREEN,
            color: GREEN,
        },
    },
    btnLabel: {
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
}));
