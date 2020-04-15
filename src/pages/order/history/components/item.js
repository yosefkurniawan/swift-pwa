import useStyles from "./style";
import Typography from "@components/Typography";
import Image from "@components/Image";
import moment from "moment";

const ItemOrder = ({ order_number, status }) => {
  const styles = useStyles();
  return (
    <div className={styles.itemContainer}>
      <img src="/assets/img/sample/product.png" className={styles.imageItem} />
      <div className={styles.contentItem}>
        <Typography variant="p" type="bold">
          {status}
        </Typography>
        <Typography variant="title" type="regular">
          {order_number}
        </Typography>
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
            <Typography
              variant="span"
              letter="capitalize"
              className="clear-margin-padding"
            >
              Rp. 1.558.000
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOrder;
