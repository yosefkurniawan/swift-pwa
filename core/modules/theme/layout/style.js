import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 50,
        },
    },
}));

export default useStyles;
