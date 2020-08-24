import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles((theme) => ({
    pageTitles: {
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    container: {
        ...FlexColumn,
        ...CreatePadding(30, 20, 20, 20),
    },
    btn: {
        marginTop: '22px',
        marginBottom: '44px',
        display: 'flex',
        alignSelf: 'center',
    },
    message: {
        marginBottom: 30,
    },
    cmsContactContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cmsContactContainerLeftBlock: {
        padding: '0 16px',
        textAlign: 'justify',
        flex: '0 0 100%',
        [theme.breakpoints.up('sm')]: {
            flex: '0 0 50%',
        },
    },
    cmsContactContainerRightBlock: {
        flex: '0 0 100%',
        [theme.breakpoints.up('sm')]: {
            flex: '0 0 50%',
        },
    },
}));
