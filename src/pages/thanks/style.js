import { makeStyles } from '@material-ui/core';
import { Centering, CreatePadding, CenterAbsolute } from '@theme/mixins';
import { WHITE } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        ...Centering,
        position: 'relative',
        ...CreatePadding(30, 30, 30, 30),
        overflow: 'hidden',
    },

    btnContinue: {
        bottom: 30,
        position: 'absolute',
        ...CenterAbsolute,
        width: '90%',
        maxWidth: 318,
        overflow: 'hidden',
    },
    textBtn: {
        color: `${WHITE} !important`,
    },
}));
