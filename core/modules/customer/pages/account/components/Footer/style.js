import makeStyles from '@material-ui/core/styles/makeStyles';
import { FONT_DEFAULT } from '@theme_typography';

export default makeStyles({
    root: {
        '& h4': {
            display: 'none',
        },
        '& ul': {
            'list-style-type': 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .pwa-link': {
            fontWeight: 'bold',
            color: '#3f3f3f',
            textDecoration: 'none',
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
            fontSize: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform: 'uppercase',
        },
        '& .container-footer .content-assets ul li a': {
            color: 'black',
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
        marginBottom: '10px',
    },
    account_navigation_link: {
        color: 'black',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: 24,
        fontWeight: '700',
        ...FONT_DEFAULT,
    },
});
