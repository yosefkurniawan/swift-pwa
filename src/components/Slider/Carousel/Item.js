import useStyles from "./style";
import Typography from "@components/Typography";
import currency from "@helpers/currency";
// import Link from "@components/Link";
import Link from "next/link";

const dummyProductUrlKey = "product-123";

const Item = ({}) => {
  const styles = useStyles();

  return (
      <div className={styles.itemContainer}>
          <div className={styles.imgItem}>
              <Link href="/product/[id]" as={`/product/${dummyProductUrlKey}`}>
                  <img src="/assets/img/noun_Image.svg" />
              </Link>
          </div>
          <div className={styles.detailItem}>
              <Link href="/product/[id]" as={`/product/${dummyProductUrlKey}`}>
                  <a>
                      <Typography variant="span">Product Name</Typography>
                  </a>
              </Link>
              <Typography variant="span" type="bold">
                  {currency({
                      value: 90000,
                      currency: "IDR"
                  })}
              </Typography>
          </div>
      </div>
  );
};

export default Item;
