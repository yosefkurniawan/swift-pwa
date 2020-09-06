import makeStyles from '@material-ui/core/styles/makeStyles';
import { Centering, CreateMargin } from '@theme/mixins';

export default makeStyles((theme) => ({
    containerItemBlog: {
        padding: 15,
    },
    itemTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    dateShare: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    iconShare: {
        marginRight: 10,
    },
    imageBlogContainer: {
        width: '100%',
        height: 320,
        ...CreateMargin(10, 0, 10, 0),
        [theme.breakpoints.down('xs')]: {
            ...Centering,
        },
        [theme.breakpoints.up('xs')]: {
            maxHeight: 320,
        },
    },
    imageBlog: {
        width: 'auto',
        height: 'auto',
        maxHeight: 320,
    },
    shareBottom: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        marginTop: 30,
    },
}));
