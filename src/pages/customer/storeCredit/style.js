import { makeStyles } from '@material-ui/core';
import {
    FlexColumn,
} from '@theme/mixins';

import { RED, GREEN } from '@theme/colors';

export default makeStyles((theme) => ({
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
    tableRowHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            border: 'none',
        },
    },
    cellChildLeft: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '180px',
    },
    cellChildMiddle: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
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
