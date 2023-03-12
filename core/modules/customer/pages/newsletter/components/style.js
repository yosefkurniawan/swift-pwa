import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, CreatePadding, CreateBorder,
} from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
    },
    block: {
        ...CreatePadding(16, 30, 16, 30),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        [theme.breakpoints.up('md')]: {
            ...CreatePadding(16, 0),
        },
        [theme.breakpoints.down('sm')]: {
            ...CreatePadding(16, 20, 0, 20),
        },
    },

    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: 1,
        ...CreatePadding(16, 16, 16, 16),
        [theme.breakpoints.up('sm')]: {
            position: 'unset',
        },
    },
    btnSave: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // width: 'fit-content',
        },
    },
    btnContainer: {
        width: '100%',
    },
}));
