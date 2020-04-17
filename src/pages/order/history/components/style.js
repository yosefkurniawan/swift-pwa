import { makeStyles } from '@material-ui/core';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow,
} from '@theme/mixins';
import { GRAY_PRIMARY } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
    },
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(30, 30, 30, 30),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    imageItem: {
        width: 80,
        height: 100,
    },

    contentItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
    },

    detailItem: {
        ...FlexRow,
        ...CreatePadding(0, 0, 0, 5),
        width: '100%',
    },

    detailContent: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 16),
    },

}));
