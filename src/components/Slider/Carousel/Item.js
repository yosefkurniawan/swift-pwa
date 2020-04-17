import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Link from 'next/link';
import useStyles from './style';

const dummyProductUrlKey = 'product-123';

const Item = () => {
    const styles = useStyles();

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/product/[id]" as={`/product/${dummyProductUrlKey}`}>
                    <img src="/assets/img/noun_Image.svg" alt="[product name]" />
                </Link>
            </div>
            <div className={styles.detailItem}>
                <Link href="/product/[id]" as={`/product/${dummyProductUrlKey}`}>
                    <a>
                        <Typography variant="span">Product Name</Typography>
                    </a>
                </Link>
                <PriceFormat value={99000} />
            </div>
        </div>
    );
};

export default Item;
