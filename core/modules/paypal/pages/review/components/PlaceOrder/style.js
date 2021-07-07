import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexRow } from '@root/core/theme/mixins';
import {
    PRIMARY, GRAY_PRIMARY, SECONDARY, GRAY_SECONDARY,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        marginTop: 30,
        marginBottom: 30,
        ...FlexRow,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 20,
        },
    },
    btnCancel: {
        marginRight: 20,
        background: GRAY_PRIMARY,
        '&:hover': {
            background: GRAY_PRIMARY,
            color: GRAY_PRIMARY,
        },
        '&:disabled': {
            background: GRAY_SECONDARY,
        },
    },
    btnPlaceOrder: {
        background: PRIMARY,
        '&:hover': {
            background: PRIMARY,
            color: PRIMARY,
        },
        '&:disabled': {
            background: SECONDARY,
        },
    },
    btnLabel: {
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
