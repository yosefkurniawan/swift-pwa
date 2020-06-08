import classNames from 'classnames';
import Typography from '@components/Typography';
import Select from '@components/Forms/Select';
import { useFormik } from 'formik';
import formatDate from '@helpers/date';
import TextField from '@components/Forms/TextField';
import DropFile from '@components/DropFile';
import Button from '@components/Button';
import Backdrop from '@components/Loaders/Backdrop';
import Message from '@components/Toast';
import useStyles from '../style';
import ItemProduct from './ItemProduct';
import ListMessage from './ListMessage';
import Loader from './Skeleton';

const optionsResolution = [
    { label: 'Refund', value: 'refund' },
    { label: 'Replacement', value: 'replacement' },
];

const DetailReturn = (props) => {
    const { t } = props;
    const styles = useStyles();
    const [load, setLoad] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        message: t('return:view:successUpdate'),
        variant: 'success',
    });
    const formik = useFormik({
        initialValues: {
            resolution: 'refund',
            condition: '',
            products: [],
            message: '',
            files: [],
        },
        onSubmit: () => {
            setLoad(true);
            setTimeout(() => {
                setLoad(false);
                setMessage({ ...message, open: true });
            }, 10000);
        },
    });
    const loading = false;
    if (loading) return <Loader />;
    return (
        <div className="column">
            <Backdrop open={load} />
            <Message
                open={message.open}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.message}
                variant={message.variant}
            />
            <form onSubmit={formik.handleSubmit}>
                <div className={classNames(styles.block, styles.detail)}>
                    <Typography variant="title" letter="uppercase" type="bold">
                        Status
                    </Typography>
                    <Typography variant="span">Approval</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('return:form:label:resolution')}
                    </Typography>
                    <Select
                        options={optionsResolution}
                        name="resolution"
                        value={formik.values.resolution}
                        onChange={formik.handleChange}
                    />
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('return:view:packageCondition')}
                    </Typography>
                    <Typography variant="span">Opened</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('return:view:orderDate')}
                    </Typography>
                    <Typography variant="span">{formatDate()}</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        Order
                    </Typography>
                    <Typography variant="span">#000001212</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('return:view:myAddress')}
                    </Typography>
                    <Typography variant="span" align="center">
                        revqi aja
                        Jalan raya no 11 Warungasem,
                        Batang, Warungasem, Candiareng, Jawa Tengah, 51252, Indonesia
                        T: 08232476211
                    </Typography>
                </div>
                <div className={styles.block}>
                    <ItemProduct {...props} />
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

                    <DropFile label={t('return:form:placeholder:uploadFile')} />
                </div>
                <div className={classNames(styles.block, styles.footer)}>
                    <Button fullWidth variant="outlined" type="submit">
                        <Typography letter="capitalize">{t('return:view:updateButton')}</Typography>
                    </Button>
                    <Button fullWidth variant="outlined">
                        <Typography letter="capitalize">{t('return:view:cancelButton')}</Typography>
                    </Button>
                </div>
            </form>
            <ListMessage />
        </div>
    );
};

export default DetailReturn;
