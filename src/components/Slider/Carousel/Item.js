import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Link from 'next/link';
import useStyles from './style';


const Item = ({
    storeConfig,
    item,
    initial = {
        name: '',
        url: '',
        price: '',
        thumbnail: '',
    },
}) => {
    const styles = useStyles();
    const url = item[initial.url] ? item[initial.url] : '';
    const image = (item[initial.thumbnail] && item[initial.thumbnail].url) ? item[initial.thumbnail].url : '/assets/img/noun_Image.svg';
    const name = item[initial.name] ? item[initial.name] : 'Product';
    const price = item[initial.price] ? item[initial.price] : 0;

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/product/[id]" as={`/product/${url}`}>
                    <img src={image} alt={name} className={styles.imgItem} />
                </Link>
            </div>
            <div className={styles.detailItem}>
                <Link href="/product/[id]" as={`/product/${url}`}>
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
