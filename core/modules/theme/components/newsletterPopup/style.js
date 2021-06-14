import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: (props) => ({
        position: 'fixed',
        bottom: '50%',
        right: theme.spacing(2),
        zIndex: theme.zIndex.drawer + 3,
        color: props.color,
        backgroundColor: props.bgColor,
        [theme.breakpoints.down('sm')]: {
            bottom: theme.spacing(10),
        },
        '&:hover': {
            backgroundColor: `${props.bgColor}E6`,
        },
    }),
    newsletter: {
        padding: 0,
        '& .row': {
            margin: 0,
        },
        '& .newsletter-left': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .newsletter-right': {
            padding: 0,
            '& img': {
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
            },
            '@media screen and (max-width: 767px)': {
                display: 'none',
            },
        },
        '& p': {
            fontSize: 11,
        },
    },
}));

export default useStyles;
