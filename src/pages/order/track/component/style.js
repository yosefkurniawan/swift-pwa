import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    bottomButtons: {
        textAlign: 'center',
    },
}));
