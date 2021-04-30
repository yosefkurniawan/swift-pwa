import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
} from '@theme_mixins';

export default makeStyles({
    root: {
        '& h4': {
            fontSize: '16px',
            color: 'black',
        },
        '& ul': {
            'list-style-type': 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .container-footer': {
            display: 'block',
        },
        '& .content-assets': {
            '& .col-sm-3': { flex: 1 },
            '& .col-xs-12': { flex: 1 },
        },
        '& li': {
            'list-style-type': 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    account_block: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center',
        position: 'relative',
    },
    account_navigation: {
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        padding: 0,
    },
    account_navigation_item: {
        flex: '0 0 auto',
        ...CreatePadding(15, 30, 15, 30),
    },
    logoutBtn: {
        background: '#ce1212',
    },
});
