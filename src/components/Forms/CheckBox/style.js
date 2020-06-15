import { makeStyles } from '@material-ui/core';
import { FlexColumn, FlexRow, CreatePadding } from '@theme/mixins';

export default makeStyles(() => ({
    row: {
        ...FlexRow,
    },
    column: {
        ...FlexColumn,
    },
    container: {
        ...FlexColumn,
    },
    checkboxContainer: {
        overflowY: 'hidden',
        overflowX: 'auto',
        justifyContent: 'space-between',
        ...CreatePadding(10, 10, 10, 0),
    },
}));