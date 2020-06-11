/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import TextField from '@components/Forms/TextField';
import classNames from 'classnames';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { useFormik } from 'formik';
import DropFile from '@components/DropFile';
import CheckBox from '@components/Forms/CheckBox';
import useStyles from '../style';
import ItemProduct from './ItemProduct';
import ItemField from './ItemField';

const optionCondition = [
    { label: 'Openend', value: 'open' },
    { label: 'Not Opened', value: 'mot-open' },
    { label: 'Damaged', value: 'damaged' },
];


const Detailreturn = (props) => {
    const { t, data: { detail, form }, currency } = props;
    const styles = useStyles();
    const formik = useFormik({
        initialValues: {
            requestForm: {},
            itemForm: [],
            message: '',
            file: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    let products = [];

    const handleSelectProduct = (val) => {
        formik.setFieldValue('products', val);
    };

    const selectAll = () => {
        const selected = detail[0].detail[0].items.map(({ sku }) => sku);
        formik.setFieldValue('products', selected);
    };

    const deselectAll = () => formik.setFieldValue('products', []);

    if (detail.length > 0) {
        products = detail[0].detail[0].items.map((product) => ({
            label: product.name,
            value: product.sku,
            ...product,
            t,
            currency,
            form,
        }));
        return (
            <div className="column">
                <form onSubmit={formik.handleSubmit}>
                    <div className={classNames(styles.block)}>
                        {
                            form && form.length > 0 && form.map((item, index) => {
                                if (item.refers === 'request') {
                                    const name = item.name.split(' ').join('_').toLowerCase();
                                    return (
                                        <ItemField
                                            key={index}
                                            options={optionCondition}
                                            name={name}
                                            label={item.frontend_labels[0].value}
                                        />
                                    );
                                } return null;
                            })
                        }
                    </div>
                    <div className={styles.labelProduct}>
                        <Typography variant="title">{t('return:product')}</Typography>
                    </div>
                    <div className={styles.selectProductContainer}>
                        <span onClick={selectAll}>
                            <Typography variant="label">{t('return:selectAll')}</Typography>
                        </span>
                        <Divider orientation="vertical" flexItem />
                        <span onClick={deselectAll}>
                            <Typography variant="label">{t('return:deselectAll')}</Typography>
                        </span>
                    </div>
                    <div className={styles.block}>
                        {detail.length > 0
                            && detail[0].detail[0].items.length > 0
                            && (
                                <CheckBox
                                    data={products}
                                    label=""
                                    value={formik.values.products}
                                    onChange={handleSelectProduct}
                                    flex="column"
                                    CustomItem={ItemProduct}
                                />
                            )}
                    </div>
                    <div className={styles.block}>
                        <TextField
                            name="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            placeholder={t('return:form:placeholder:message')}
                            label={t('return:form:label:message')}
                            multiline
                            rows={4}
                        />
                    </div>
                    <div className={styles.block}>
                        <DropFile label={t('return:form:placeholder:uploadFile')} />
                    </div>
                    <div className={styles.block}>
                        <Button fullWidth>
                            <Typography letter="capitalize" color="white">{t('return:form:submit')}</Typography>
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('return:notFound')}
        </Alert>
    );
};

export default Detailreturn;
