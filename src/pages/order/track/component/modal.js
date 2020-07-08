import Header from '@components/Header';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Result from './result';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const {
        open, handleOpenDialog, t,
    } = props;

    return (
        <>
            <Dialog fullScreen open={open} onClose={() => handleOpenDialog(false)} TransitionComponent={Transition}>
                <DialogTitle>
                    <Header
                        LeftComponent={{
                            onClick: () => handleOpenDialog(false),
                        }}
                        pageConfig={{
                            headerTitle: t('order:trackingInformation'),
                            headerBackIcon: 'close',
                            header: 'relative',
                        }}
                    />
                </DialogTitle>
                <DialogContent>
                    {open ? <Result {...props} /> : null}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalResult;
