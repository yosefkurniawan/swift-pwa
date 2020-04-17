import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 100,
    },
    fullWidth: {
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 375,
        },
    },
}));

export default useStyles;
