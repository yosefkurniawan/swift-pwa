import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY } from '@theme_color';
import {
    CreateBorder,
    CreatePadding,
    FlexRow,
} from '@theme_mixins';

export default makeStyles(() => ({
    item: {
        ...CreatePadding(17, 17, 17, 17),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('2px', '2px', '2px', '2px', GRAY_PRIMARY),
        borderRadius: 20,
        cursor: 'pointer',
    },
    active: {
        ...CreateBorder('2px', '2px', '2px', '2px', '#7868e6'),
    },
}));
