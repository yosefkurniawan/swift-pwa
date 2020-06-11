import { makeStyles } from '@material-ui/core';
import {
    CreatePadding,
    FlexColumn,
} from '@theme/mixins';
import { GRAY_LIGHT, WHITE, GRAY_SECONDARY } from '@theme/colors';

export default makeStyles({
    container: {
        ...CreatePadding(15, 15, 15, 15),
        ...FlexColumn,
    },
    itemContainer: {
        ...CreatePadding(15, 15, 15, 15),
        display: 'inline-block',
        clear: 'both',
        padding: 20,
        marginBottom: 20,
        width: '85%',
        borderRadius: 20,
    },
    left: {
        float: 'left',
        backgroundColor: GRAY_LIGHT,
    },
    right: {
        float: 'right',
        backgroundColor: GRAY_SECONDARY,
        color: WHITE,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
});
