import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme/colors';
import { CreateBorder, CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreateBorder('1px', 0, '1px', 0, GRAY_SECONDARY),
        ...CreatePadding(20, 20, 20, 20),
    },
    title: {
        marginBottom: 20,
        marginLeft: 0,
    },
    checkbox: {
        paddingTop: 0,
        marginTop: 0,
    },
    checkboxContainer: {
        margin: '20px 0px',
        padding: 0,
        marginTop: 0,
    },
    select: {
        marginTop: 20,
        marginBottom: 20,
    },
    radio: {
        marginBottom: 20,
        marginTop: 0,
    },
}));
