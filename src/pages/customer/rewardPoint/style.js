import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexRow } from '@theme/mixins';

export default makeStyles({
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(15, 15, 15, 15),
        marginBottom: 20,
    },
    divider: {
        marginBottom: 30,
    },
});
