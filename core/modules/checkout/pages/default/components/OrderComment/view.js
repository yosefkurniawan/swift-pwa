import classNames from 'classnames';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import Button from '@common_button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';

const OrderCommentView = (props) => {
    const styles = useStyles();
    const {
        handleOrderComment,
        formik,
        disabled,
        hasData = false,
        loading = false,
    } = props;
    return (
        <>
            <div className={classNames(styles.block, styles.rmBorder)}>
                <div className={styles.orderCommentContainer}>
                    <TextField
                        name="orderComment"
                        onChange={formik.handleChange}
                        value={formik.values.orderComment}
                        disabled={disabled}
                        placeholder="Order Coment"
                        label="Order Coment"
                        className={styles.textField}
                        multiline
                        row="4"
                        error={!!(formik.touched.orderComment && formik.errors.orderComment)}
                        errorMessage={(formik.touched.orderComment && formik.errors.orderComment) || null}
                    />
                    <div>
                        <Button
                            variant="outlined"
                            className={styles.btnAdd}
                            onClick={() => {
                                handleOrderComment();
                            }}
                            disabled={loading || formik.values.orderComment === ''}
                        >
                            <Typography
                                variant="p"
                                color={loading || formik.values.orderComment === '' ? 'gray' : 'default'}
                                type="bold"
                                letter="uppercase"
                            >
                                {hasData ? 'Remove' : 'Apply'}
                            </Typography>
                            {loading && <CircularProgress className={styles.smallCircular} size={16} />}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderCommentView;
