import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_LIGHT, GRAY_PRIMARY, GREEN, WHITE,
} from '@theme_color';
import {
    FlexColumn,
    CreateBorder,
    CenterAbsolute,
    Centering,
} from '@theme_mixins';

const useStyles = makeStyles(() => ({
    container: {
        background: GRAY_LIGHT,
        width: '100%',
        height: 'auto',
        padding: 20,
        ...FlexColumn,
        position: 'sticky',
        top: 100,
        marginBottom: 40,
    },
    list: {
        ...CreateBorder('1px', 0, 0, 0, GRAY_PRIMARY),
    },
    btnCheckout: {
        ...CenterAbsolute,
        marginTop: 20,
        minWidth: '90%',
    },
    labelItem: {
        maxWidth: '50%',
    },
    expanItem: {
        background: 'transparent',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
    },

    listProduct: {
        padding: 20,
    },
    imgProduct: {
        width: 75,
        height: 'auto',
    },
    imgBox: {
        position: 'relative',
    },
    freeItem: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        minWidth: 15,
        minHeight: 10,
        backgroundColor: GREEN,
        color: WHITE,
        fontWeight: '700',
        fontSize: 8,
        padding: 2,
        borderRadius: 3,
        ...Centering,
        marginLeft: 'auto',
        marginRight: 5,
        textTransform: 'uppercase',
    },
    bodyProductItem: {
        ...FlexColumn,
    },
}));

export default useStyles;
