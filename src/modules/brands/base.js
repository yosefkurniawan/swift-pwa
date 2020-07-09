/* eslint-disable no-param-reassign */
import { PropTypes } from 'prop-types';
import { getBrands } from './services';
import allData from './models/generateAllData';

const Base = (props) => {
    const {
        Content, Skeleton, generateAllData, t, Layout, pageConfig,
    } = props;
    const {
        data, loading,
    } = getBrands({ pageSize: 100, currentPage: 1 });
    const config = {
        title: t('brands:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('brands:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };

    if (loading) {
        return <Skeleton {...props} />;
    }

    const { getBrandList } = data;

    const allBrands = generateAllData ? generateAllData(getBrandList.items) : allData(getBrandList.items);

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content {...props} all={allBrands} featured={getBrandList.featured} />
        </Layout>
    );
};

Base.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

Base.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
};

export default Base;
