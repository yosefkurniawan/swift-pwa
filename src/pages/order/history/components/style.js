import { makeStyles } from '@material-ui/core';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow,
} from '@theme/mixins';
import { GRAY_PRIMARY } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        display: 'flex',
    },
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(15, 15, 15, 15),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    imageItem: {
        width: 80,
        height: 100,
    },

    contentItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
        width: '100%',
    },

    columnLabel: {
        width: '30%',
    },

    detailItem: {
        ...FlexRow,
        ...CreatePadding(0, 0, 0, 5),
        width: '100%',
    },

    detailContent: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 16),
        width: '70%',
    },

    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
}));
