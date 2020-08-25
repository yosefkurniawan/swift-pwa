import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, GRAY_PRIMARY } from '@theme/colors';
import {
    FlexColumn,
    CreateBorder,
    CenterAbsolute,
} from '@theme/mixins';

const useStyles = makeStyles(() => ({
    container: {
        background: GRAY_LIGHT,
        width: '100%',
        height: 'auto',
        padding: 20,
        ...FlexColumn,
        position: 'relative',
    },
    list: {
        ...CreateBorder('1px', 0, 0, 0, GRAY_PRIMARY),
    },
    btnCheckout: {
        ...CenterAbsolute,
        minWidth: 250,
        marginTop: 20,
    },
}));

export default useStyles;
