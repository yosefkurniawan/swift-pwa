import { makeStyles } from '@material-ui/core';
import { CreateMargin, CreateBorder } from '@theme/mixins';
import { PRIMARY, SECONDARY } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        borderRadius: 100,
        width: 47,
        height: 47,
        ...CreateMargin(11, 11, 11, 11),
    },
    bordered: {
        ...CreateBorder('3px', '3px', '3px', '3px', PRIMARY),
    },
    borderedSecondary: {
        ...CreateBorder('3px', '3px', '3px', '3px', SECONDARY),
    },
}));
