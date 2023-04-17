import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'unset !important',
        '& .slider-container': {
            width: '100%',
            padding: '10px 0px',
            '& button': {
                top: '50%',
                transform: 'translateY(-50%)',
            },
        },
    },
    containerLoading: {
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default useStyles;
