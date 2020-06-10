import ProductItem from '@components/ProductItem';
import useStyles from './style';

const Item = ({
    price_range,
    price_tiers,
    __typename,
    url_key,
    small_image,
    name,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <ProductItem
                // id
                name={name}
                small_image={small_image}
                price_range={price_range}
                price_tiers={price_tiers}
                url_key={url_key}
                __typename={__typename}
                variants={[]}
                configurable_options={[]}
                showFeed={false}
                // categorySelect
            />
        </div>
    );
};

export default Item;
