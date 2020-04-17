import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import Header from '@components/Header';
import Typography from '@components/Typography';
import { Dialog, IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import RatingStar from '../RatingStar';
import useStyles from './style';

const CustomHeader = ({ onClose }) => (
    <Header
        pageConfig={{
            header: 'absolute',
        }}
        LeftComponent={(
            <IconButton onClick={onClose}>
                <Close fontSize="large" />
            </IconButton>
        )}
    />
);

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddReviewDialog = ({ open = false, setOpen = () => {}, t }) => {
    const styles = useStyles();
    const [rating, setRating] = React.useState(0);
    const handleRating = (val) => {
        setRating(val);
    };
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={setOpen}
            TransitionComponent={Transition}
        >
            <CustomHeader onClose={setOpen} />
            <div className={styles.root}>
                <div className={styles.container}>
                    <Typography variant="title" type="semiBold" align="center">
                        {t('product:writeReview')}
                    </Typography>
                    <TextField
                        placeholder={t('product:nickname')}
                        label={t('product:nickname')}
                        className={styles.textField}
                    />
                    <TextField
                        placeholder={t('product:summary')}
                        label={t('product:summary')}
                        className={styles.textField}
                    />
                    <TextField
                        placeholder={t('product:review')}
                        label={t('product:review')}
                        className={styles.textField}
                        multiline
                        row="4"
                    />
                    <div className={styles.ratingContainer}>
                        <Typography variant="p" type="semiBold">
                            {t('product:rate')}
                        </Typography>
                        <RatingStar
                            disabled={false}
                            onChange={handleRating}
                            value={rating}
                            sizeIcon={30}
                        />
                    </div>
                    <Button color="primary" onClick={setOpen}>
                        {t('product:submitReview')}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default AddReviewDialog;
