import useStyles from "./style";
import Image from "../../Image";
import Typography from "../../Typography";
import PriceFormat from '../../price/priceFormat'

const Item = ({}) => {
  const styles = useStyles();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imgItem}>
        <Image src="ad" />
      </div>
      <div className={styles.detailItem}>
        <Typography variant="span">Product</Typography>
        <Typography variant="span" type="bold">
          <PriceFormat value={90000} currency="IDR" />
        </Typography>
      </div>
    </div>
  );
};

export default Item;
