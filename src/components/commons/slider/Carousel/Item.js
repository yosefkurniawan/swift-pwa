import useStyles from "./style";
import Typography from "../../Typography";
import currency from "../../../../helpers/currency";

const Item = ({}) => {
  const styles = useStyles();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imgItem}>
        <img src="/assets/img/noun_Image.svg" />
      </div>
      <div className={styles.detailItem}>
        <Typography variant="span">Product</Typography>
        <Typography variant="span" type="bold">
         {
           currency({
             value : 90000,
             currency : 'IDR'
           })
         }
        </Typography>
      </div>
    </div>
  );
};

export default Item;
