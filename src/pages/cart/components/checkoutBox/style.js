import { makeStyles } from '@material-ui/core';
import { WHITE } from '@theme/colors';
import { CreatePadding, CreateMargin } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    checkoutBox: {
        background: WHITE,
        ...CreatePadding(5, 18, 18, 18),
        boxShadow: '0 -1px 3px #0000001A',
    },
    goToCheckout: {
        minWidth: 300,
    },
    subtotal: {
        fontSize: 16,
        textAlign: 'center',
        ...CreateMargin(10, 0, 10, 0),
    },
}));

export default useStyles;
