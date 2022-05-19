import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateBorder, CreateMargin, CreatePadding } from '@theme_mixins';
import { PRIMARY } from '@theme_color';
import { FONT_DEFAULT, FONT_10, FONT_REGULAR } from '@theme_typography';

export default makeStyles(() => ({
    root: {
        width: '100%',
        ...CreateMargin(15, 0, 15, 0),
        ...CreateBorder('1px', 0, 0, 0, PRIMARY),
    },
    expandContainer: {
        boxShadow: 'none',
        borderRadius: 'none',
        margin: 0,
    },
    headerExpand: {
        padding: 0,
        height: 40,
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
    },
    bodyExpand: {
        ...CreatePadding(0, 0, 20, 0),
        margin: 0,
    },
    headerOpen: {
        borderBottom: 'none !important',
    },
    bodyOpen: {
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
    },
    icon: {
        fontSize: 16,
        color: PRIMARY,
    },
    listLabel: {
        ...FONT_REGULAR,
    },
    listValue: {
        ...FONT_DEFAULT,
        ...FONT_10,
    },
}));
