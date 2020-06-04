import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        width: 233,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer',
    },
    imgBrand: {
        width: '100%',
        height: 'auto',
    },
}));

export default useStyles;
