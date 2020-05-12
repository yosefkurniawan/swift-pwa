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
        ...CreatePadding(20, 0, 0, 0),
    },
    skeletonContainer: {
        padding: '16px',
        width: '100%',
    },
    skeletonField: {
        marginBottom: '24px',
    },
    skeleton: {
        margin: '6px',
    },
}));
