/* eslint-disable no-param-reassign */
import { PropTypes } from 'prop-types';
import { getBrands } from './services';
import allData from './models/generateAllData';

const Base = (props) => {
    const { Content, Skeleton, generateAllData } = props;
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    if (loading) {
        return <Skeleton {...props} />;
    }

    const { getBrandList } = data;

    const allBrands = generateAllData ? generateAllData(getBrandList.items) : allData(getBrandList.items);
    return <Content {...props} all={allBrands} featured={getBrandList.featured} />;
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
