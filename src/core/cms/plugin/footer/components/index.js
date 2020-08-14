import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';

const FooterView = (props) => {
    const {
        data, t, loading, error,
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;
    console.log(data);
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />
        </>
    );
};

export default FooterView;
