import { makeStyles } from '@material-ui/core';
import {
    FlexColumn,
} from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: 15,
    },
    tableContainer: {
        paddingTop: 10,
    },
    table: {
        width: '100%',
    },
    editLink: {
        marginTop: 20,
    },
}));
