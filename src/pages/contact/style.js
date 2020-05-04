import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(30, 20, 20, 20),
    },
    btn: {
        display: 'flex',
        alignSelf: 'center',
    },
}));
