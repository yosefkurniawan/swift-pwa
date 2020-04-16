import useStyles from "./style";
import Typography from "@components/Typography";
import PriceFormat from "@components/PriceFormat";
import moment from "moment";
import Link from "next/link";

const ItemOrder = ({ order_number, status }) => {
  const styles = useStyles();
  return (
    <div className={styles.itemContainer}>
      <img src="/assets/img/sample/product.png" className={styles.imageItem} />
      <div className={styles.contentItem}>
        <Typography variant="p" type="bold">
          {status}
        </Typography>
        <Link href="/order/detail/[id]" as={`/order/detail/${order_number}`}>
          <a>
            <Typography variant="title" type="regular">
              #{order_number}
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
              {moment().format("DD/M/YYYY")}
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
              defautlSet={true}
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
