import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    bottomButtons: {
        textAlign: 'left',
    },
    tColContent: {
        padding: '14px 0',
    },
    skeletonForm: {
        marginBottom: 20,
    },
    detail: {
        textAlign: 'right',
        maxWidth: '60%',
    },
    label: {
        textAlign: 'left',
        maxWidth: '40%',
    },

    listItem: {
        [theme.breakpoints.down('xs')] : {
            borderBottom: `1px solid ${GRAY_PRIMARY}`
        }
    }
}));
