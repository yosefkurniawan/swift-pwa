import FeaturedBrands from './featured';
import { getBrands } from '../services';
import AllBrands from './all';
import SkeletonBrands from './skeleton';

const ComponentBrands = ({ t }) => {
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    if (loading) {
        return <SkeletonBrands t={t} />;
    }

    const { getBrandList } = data;

    return (
        <>
            <FeaturedBrands t={t} data={getBrandList.featured} />
            <AllBrands t={t} data={getBrandList.items} />
        </>
    );
};

export default ComponentBrands;
