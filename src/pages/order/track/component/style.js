import { makeStyles } from '@material-ui/core';
import { CreatePadding, FlexColumn } from '@theme/mixins';
import { WHITE, SECONDARY } from '@theme/colors';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    bottomButtons: {
        textAlign: 'center',
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        boxShadow: 'none',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: SECONDARY,
    },
    modalContainer: {
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
    },
    tColContent: {
        padding: '10px 0',
    },
    skeletonForm: {
        marginBottom: 20,
    },
}));
