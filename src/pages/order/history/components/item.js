import Typography from '@components/Typography';
import PriceFormat from '@components/PriceFormat';
import moment from 'moment';
import Link from 'next/link';
import useStyles from './style';

const ItemOrder = ({ orderNumber, status }) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <img src="/assets/img/sample/product.png" className={styles.imageItem} alt="[product name]" />
            <div className={styles.contentItem}>
                <Typography variant="p" type="bold">
                    {status}
                </Typography>
                <Link href="/order/detail/[id]" as={`/order/detail/${orderNumber}`}>
                    <a>
                        <Typography variant="title" type="regular">
                            #
                            {orderNumber}
                        </Typography>
                    </a>
                </Link>
                <div className={styles.detailItem}>
                    <div className="column">
                        <Typography
                            variant="span"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            Date
                        </Typography>
                        <Typography
                            variant="span"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            No of Items
                        </Typography>
                        <Typography
                            variant="span"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            Total
                        </Typography>
                    </div>
                    <div className={styles.detailContent}>
                        <Typography
                            variant="span"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            {moment().format('DD/M/YYYY')}
                        </Typography>
                        <Typography
                            variant="span"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            3
                        </Typography>
                        <PriceFormat
                            value={999000}
                            defautlSet
                            variant="span"
                            type="regular"
                            letter="capitalize"
                            className="clear-margin-padding"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;
