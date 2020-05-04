import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexColumn, CreateMargin } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(30, 20, 10, 10),
    },
    btn: {
        display: 'flex',
        alignSelf: 'center',
    },
    name: {
        ...CreateMargin(15, 5, 15, 5),
    },
    email: {
        ...CreateMargin(15, 5, 15, 5),
    },
}));
