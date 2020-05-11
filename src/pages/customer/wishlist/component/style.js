import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import { CreatePadding } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    pageTitle: {
        fontWeight: 700,
        textAlign: 'center',
        color: PRIMARY,
        textTransform: 'uppercase',
        position: 'absolute',
        left: '50px',
        right: '50px',
    },
    wishlistWrapper: {
        // paddingTop: "50px"
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        ...CreatePadding(0, 15, 0, 15),
        textAlign: 'center',
    },
}));

export default useStyles;
