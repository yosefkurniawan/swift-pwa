/* eslint-disable no-param-reassign */
import { PropTypes } from 'prop-types';
import { getBrands } from './services';

const generateAllData = (data = []) => {
    const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const brandA = a.name.toUpperCase();
        const brandB = b.name.toUpperCase();

        let comparison = 0;
        if (brandA > brandB) {
            comparison = 1;
        } else if (brandA < brandB) {
            comparison = -1;
        }
        return comparison;
    };

    data = data.sort(compare);

    let brands = data.reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
    }, {});
    brands = Object.values(brands);

    return brands;
};

const Base = (props) => {
    const { Content, Skeleton } = props;
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    if (loading) {
        return <Skeleton {...props} />;
    }

    const { getBrandList } = data;

    const allBrands = generateAllData(getBrandList.items);
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
