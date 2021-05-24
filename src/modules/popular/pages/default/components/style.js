import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles(() => ({
    pageTitles: {
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    container: {
        ...FlexColumn,
        ...CreatePadding(15, 10, 10, 10),
    },
    btnSubmit: {
        marginTop: 50,
        textAlign: 'left',
    },
    message: {
        marginBottom: 30,
    },
    skeletonForm: {
        marginBottom: 20,
    },
    card: {
        padding: 5,
        margin: 5,
        maxWidth: 200,
        minWidth: 200,
        minHeight: 280,
        maxHeigth: 280,
        '& .cardMedia': {
            paddingTop: '100%',
            maxWidth: 200,
        },
        '& .cardName': {
            paddingTop: 5,
        },
    },
}));
