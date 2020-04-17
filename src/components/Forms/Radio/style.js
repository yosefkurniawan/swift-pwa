import { makeStyles } from '@material-ui/core';
import { CreateMargin, FlexColumn, FlexRow } from '@theme/mixins';

const useStyles = makeStyles({
    root: {
        ...CreateMargin(0, 0, 0, 0),
        ...FlexColumn,
    },
    column: {
        ...FlexColumn,
    },
    row: {
        ...FlexRow,
    },
});

export default useStyles;
