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
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            '&::before': {
                paddingRight: '10px',
                content: 'attr(data-th) \' : \'',
                display: 'inline-block',
                color: '#000',
                fontWeight: 700,
            },
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
