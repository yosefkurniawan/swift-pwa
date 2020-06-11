import { makeStyles } from '@material-ui/core';
import { Centering, CreateMargin } from '@theme/mixins';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
    },
    containerItemBlog: {
        padding: 15,
    },
    itemTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    listShareIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-arround',
        marginLeft: 10,
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
        ...Centering,
        ...CreateMargin(10, 0, 10, 0),
        [theme.breakpoints.down('sm')]: {
            maxHeight: 320,
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: 800,
        },
    },
    imageBlog: {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxHeight: 320,
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: 800,
        },
    },
    shareBottom: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        marginTop: 30,
    },
}));
