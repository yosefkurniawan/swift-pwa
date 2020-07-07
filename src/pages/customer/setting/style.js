import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, CreatePadding, CreateBorder, CenterAbsolute, Centering,
} from '@theme/mixins';
import { GRAY_PRIMARY } from '@theme/colors';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
    },
    block: {
        ...CreatePadding(16, 30, 16, 30),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        ...Centering,
        ...CenterAbsolute,
        ...CreatePadding(16, 16, 16, 16),
    },
    btnSave: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 375,
        },
    },
    btnContainer: {
        width: 'fit-content',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
        },
    },
}));
