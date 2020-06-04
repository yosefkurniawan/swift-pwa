import FeaturedBrands from './featured';
import { getBrands } from '../services';

const ComponentBrands = () => {
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    if (loading) {
        return <div>loading</div>;
    }

    const { getBrandList } = data;
    return (
        <div>
            <FeaturedBrands data={getBrandList.featured} />
        </div>
    );
};

export default ComponentBrands;
