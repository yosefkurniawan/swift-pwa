import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: GRAY_PRIMARY,
    },
    padding: {
        padding: theme.spacing(2),
    },
}));

export default useStyles;
