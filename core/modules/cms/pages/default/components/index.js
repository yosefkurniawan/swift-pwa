import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig,
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }

    if (loading) return <Loading open={loading} />;
    return (
        <div className="cms-container">
            {/* eslint-disable-next-line react/no-danger */}
            <h4 className="title center" dangerouslySetInnerHTML={{ __html: data.cmsPage.title }} />
            {/* <div className="content" dangerouslySetInnerHTML={{ __html: data.cmsPage.content }} /> */}
            <CmsRenderer type="page" content={data.cmsPage.content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
