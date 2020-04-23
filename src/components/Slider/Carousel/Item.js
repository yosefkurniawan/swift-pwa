import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Link from 'next/link';
import useStyles from './style';

const Item = ({
    storeConfig,
    // item,
    url,
    imageSrc,
    name,
    price,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="[...slug]" as={`${url}`}>
                    <img src={imageSrc} alt={name} className={styles.imgItem} />
                </Link>
            </div>
            <div className={styles.detailItem}>
                <Link href="[...slug]" as={`${url}`}>
                    <a>
                        <Typography variant="span">{name}</Typography>
                    </a>
                </Link>
                <PriceFormat value={price} storeConfig={storeConfig} />
            </div>
        </div>
    );
};

export default Item;
