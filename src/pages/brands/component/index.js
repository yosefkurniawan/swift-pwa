import FeaturedBrands from './featured';
import { getBrands } from '../services';
import AllBrands from './all';
import SkeletonBrands from './skeleton';

const ComponentBrands = () => {
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    if (loading) {
        return <SkeletonBrands />;
    }

    const { getBrandList } = data;

    return (
        <>
            <FeaturedBrands data={getBrandList.featured} />
            <AllBrands data={getBrandList.items} />
        </>
    );
};

export default ComponentBrands;
