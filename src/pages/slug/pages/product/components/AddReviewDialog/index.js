import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import Header from '@components/Header';
import Typography from '@components/Typography';
import { Dialog, IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStyles from './style';
import { addReview } from '../../services/graphql';

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

const AddReviewDialog = ({
    open = false, setOpen = () => {}, t, data,
}) => {
    const styles = useStyles();
    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required(t('product:validate:nickname')),
        title: Yup.string().required(t('product:validate:title')),
        detail: Yup.string().required(t('product:validate:detail')),
        rating: Yup.string().required(t('product:validate:rating')).nullable(),
    });

    const [addProductReview] = addReview();

    const Formik = useFormik({
        initialValues: {
            nickname: '',
            rating: null,
            title: '',
            detail: '',
            pkValue: data.id,
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => {
            resetForm({});
            addProductReview({
                variables: {
                    ...value,
                },
            }).then(() => {
                setOpen({
                    variant: 'success',
                });
            }).catch((e) => {
                setOpen({
                    message: e.message.split(':')[1] || t('product:addRateFailed'),
                    variant: 'error',
                });
            });
        },
    });
    return (
        <Dialog fullScreen open={open} onClose={setOpen} TransitionComponent={Transition}>
            <CustomHeader onClose={setOpen} />
            <div className={styles.root}>
                <form onSubmit={Formik.handleSubmit} className={styles.container}>
                    <Typography variant="title" type="semiBold" align="center" letter="capitalize">
                        {t('product:writeReview')}
                    </Typography>
                    <TextField
                        name="nickname"
                        onChange={Formik.handleChange}
                        value={Formik.values.nickname}
                        placeholder={t('product:nickname')}
                        label={t('product:nickname')}
                        className={styles.textField}
                        error={!!Formik.errors.nickname}
                        errorMessage={Formik.errors.nickname || null}
                    />
                    <TextField
                        name="title"
                        onChange={Formik.handleChange}
                        value={Formik.values.title}
                        label={t('product:title')}
                        className={styles.textField}
                        error={!!Formik.errors.title}
                        errorMessage={Formik.errors.title || null}
                    />
                    <TextField
                        name="detail"
                        onChange={Formik.handleChange}
                        value={Formik.values.detail}
                        placeholder={t('product:review')}
                        label={t('product:review')}
                        className={styles.textField}
                        multiline
                        row="4"
                        error={!!Formik.errors.detail}
                        errorMessage={Formik.errors.detail || null}
                    />
                    <div className={styles.ratingContainer}>
                        <Typography variant="p" type="semiBold">
                            {t('product:rate')}
                        </Typography>
                        <Rating
                            name="rating"
                            value={Formik.rating}
                            onChange={(event, newValue) => {
                                Formik.setFieldValue('rating', newValue);
                            }}
                        />
                        {Formik.errors.rating && (
                            <Typography variant="p" color="red">
                                {Formik.errors.rating || ''}
                            </Typography>
                        )}
                    </div>
                    <Button type="submit" color="primary">
                        {t('product:submitReview')}
                    </Button>
                </form>
            </div>
        </Dialog>
    );
};

export default AddReviewDialog;
