import Typography from '@components/Typography';
import Button from '@components/Button';
import { Tune } from '@material-ui/icons';
import PropTypes from 'prop-types';
import GridList from '@components/GridList';
import ProductItem from '@components/ProductItem';
import Loading from '@components/Loaders';
import useStyles from '../style';
import Filter from './Filter';
import { getProductByCategory } from '../services';

const getProduct = (catId, config = {}) => {
    const { loading, data } = getProductByCategory(catId, config);
    return {
        loading,
        data,
    };
};

const Product = ({ catId }) => {
    const styles = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filter, setFilter] = React.useState({});
    const config = {
        pageSize: 20,
        currentPage: 1,
        filter: [],
    };
    if (filter.sort) {
        config.sort = JSON.parse(filter.sort);
    }
    if (filter.priceRange && filter.priceRange[1] !== 0) {
        config.filter.push({
            type: 'price',
            from: filter.priceRange[0],
            to: filter.priceRange[1],
        });
    }

    const { loading, data } = getProduct(catId, config);
    if (loading) {
        return <Loading size="50px" />;
    }

    const { products } = data;
    return (
        <>
            <Filter
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                catId={catId}
                setFilter={setFilter}
            />
            <div className={styles.filterContainer}>
                <Typography
                    variant="p"
                    type="regular"
                    className={styles.countProductText}
                >
                    {products.total_count}
                    {' '}
                    Product
                </Typography>
                <div className={styles.filterBtnContainer}>
                    <Button
                        variant="text"
                        className={styles.btnFilter}
                        onClick={() => setOpenFilter(true)}
                    >
                        <Tune className={styles.iconFilter} />
                    </Button>
                    <Typography type="bold" variant="span" letter="capitalize">
                        Filter & Sort
                    </Typography>
                </div>
            </div>

            <div className={styles.productContainer}>
                <GridList
                    data={products.items}
                    ItemComponent={ProductItem}
                    itemProps={{
                        color: ['#343434', '#6E6E6E', '#989898', '#C9C9C9'],
                        showListColor: true,
                        showListSize: true,
                        size: ['s', 'm', 'l', 'xl'],
                    }}
                    gridItemProps={{ xs: 6, sm: 4, md: 3 }}
                />
            </div>
        </>
    );
};

Product.propTypes = {
    catId: PropTypes.number.isRequired,
};

export default Product;
