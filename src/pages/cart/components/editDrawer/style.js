import { makeStyles } from '@material-ui/core';
import { FlexColumn, CreatePadding, CreateMargin } from '@theme/mixins';
import { RED } from '@theme/colors';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...FlexColumn,
        ...CreatePadding(18, 18, 18, 18),
    },
    error: {
        color: RED,
    },
    selector: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
    },
    qty: {
        ...CreateMargin(15, 30, 15, 15),
    },
}));

export default useStyles;
