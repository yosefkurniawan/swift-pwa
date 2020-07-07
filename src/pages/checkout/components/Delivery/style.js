import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY } from '@theme/colors';
import {
    CreateBorder,
    CreatePadding,
    FlexRow,
    CreateMargin,
} from '@theme/mixins';

export default makeStyles(() => ({
    active: {
        ...CreateMargin(30, 0, 30, 0),
        ...CreatePadding(17, 17, 17, 17),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', PRIMARY),
        borderRadius: 10,
    },
    list: {
        marginBottom: -30,
        marginTop: -20,
    },
}));
