import { makeStyles } from '@material-ui/core';
import { WHITE } from '@theme/colors';
import { CreatePadding, CreateMargin } from '@theme/mixins';

const useStyles = makeStyles((theme) => ({
    checkoutBox: {
        background: WHITE,
        ...CreatePadding(5, 18, 18, 18),
        boxShadow: '0 -1px 3px #0000001A',
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        zIndex: theme.zIndex.drawer + 1,
    },
    summary: {
        textAlign: 'center',
        padding: 10,
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
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
