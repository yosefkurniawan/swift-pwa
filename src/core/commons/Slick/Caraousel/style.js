import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    caraousel: {
        width: '100%',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
    },
}));

export default useStyles;
