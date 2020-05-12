import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    editContainer: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 30, 0),
    },
    checkboxLabel: {
        marginBottom: '12px',
    },
    bottomButtons: {
        ...CreatePadding(30, 0, 0, 0),
    },
}));
