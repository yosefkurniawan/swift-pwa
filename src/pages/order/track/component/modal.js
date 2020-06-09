import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Result from './result';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const {
        open, handleOpenDialog, t,
    } = props;
    const styles = useStyles();

    return (
        <>
            <Dialog fullScreen open={open} onClose={() => handleOpenDialog(false)} TransitionComponent={Transition}>

                <AppBar className={styles.appBar}>
                    <Toolbar>
                        <IconButton edge="start" onClick={() => handleOpenDialog(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={styles.title}>
                            {t('order:trackingInformation')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles.modalContainer}>
                    {open ? <Result {...props} /> : null}
                </div>
            </Dialog>
        </>
    );
};

export default ModalResult;
