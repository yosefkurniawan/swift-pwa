import Typography from '@common_typography';
import Alert from '@material-ui/lab/Alert/Alert';
import Layout from '@core/customer/components/layout';
import Skeleton from './skeleton';

const NotificationData = (props) => {
    const {
        t, loading, error, data, localDateString,
    } = props;

    if (loading) return <Skeleton />;
    if (error) return <Alert severity="error">{`Error: ${error.message}`}</Alert>;
    if (!data) return <Alert severity="error">{t('notification:not_found')}</Alert>;

    const item = data.readNotification.items[0];

    return (
        <Layout {...props}>
            <div className="container">
                <Typography variant="p" style={{ marginBottom: 12 }} size="10" type="regular">
                    {localDateString(item.createdAt)}
                </Typography>
                <Typography variant="p" size="14" type="regular">
                    {item.subject}
                </Typography>
                <Typography variant="p" size="12" type="regular">
                    {item.content}
                </Typography>
            </div>
        </Layout>
    );
};

export default NotificationData;
