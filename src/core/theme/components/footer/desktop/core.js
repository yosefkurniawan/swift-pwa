import { getCmsBlocks } from '../../../services/graphql';

const Footer = (props) => {
    const {
        Content, t, storeConfig,
    } = props;
    const { data, loading, error } = getCmsBlocks({ identifiers: ['pwa_footer'] });

    const Config = {
        title: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        headerTitle: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    return (
        <Content
            data={data}
            {...Config}
            t={t}
            loading={loading}
            error={error}
            storeConfig={storeConfig}
        />
    );
};

export default Footer;
