import { makeStyles } from '@material-ui/core';
import {
    FlexColumn,
} from '@theme/mixins';

import { RED, GREEN } from '@theme/colors';

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
    textGreen: {
        color: GREEN,
    },
    textRed: {
        color: RED,
    },
}));
