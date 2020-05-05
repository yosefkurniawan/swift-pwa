import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Link from 'next/link';
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
            <Link href="/[...slug]" as={`/${url_key}`}>
                <div className={styles.imgItem}>
                    <img
                        src={small_image.url}
                        alt={name}
                        className={styles.imgItem}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    />
                </div>
            </Link>
            <div className={styles.detailItem}>
                <Link href="/[...slug]" as={`/${url_key}`}>
                    <a>
                        <Typography variant="span">{name}</Typography>
                    </a>
                </Link>
                <PriceFormat priceRange={price_range} priceTiers={price_tiers} productType={__typename} />
            </div>
        </div>
    );
};

export default Item;
