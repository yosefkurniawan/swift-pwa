import Typography from "@components/Typography";
import Button from "@components/Button";
import Radio from "@components/Forms/Radio";
import DeliveryItem from "./RadioDeliveryItem";
import classNames from "classnames";

import useStyles from "../style";

const deliveryData = [
  { label: "Standart", value: { name: "standart", price: 1000 } },
  { label: "Express", value: { name: "express", price: 2500 } },
];

const Checkout = (props) => {
  const { t } = props;
  const styles = useStyles();
  const [delivery, setDelivery] = React.useState([]);
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.addressContainer}>
          <div className={styles.addressText}>
            <Typography variant="title" type="bold" letter="uppercase">
              {t("checkout:shippingAddress")}
            </Typography>
            <Typography variant="p">
              Diasty Jl Kalibata Timur I no.1 rt.01/rw.01 Pancoran, Jakarta
              Selatan 12740 081234567890
            </Typography>
          </div>
          <Button variant="outlined">
            <Typography variant="p" type="bold" letter="uppercase">
              {t("common:button:change")}
            </Typography>
          </Button>
        </div>
      </div>
      <div className={styles.block}>
        <Typography variant="title" type="bold" letter="uppercase">
          {t("checkout:diliveryMethod")}
        </Typography>
        <Radio
          value={delivery}
          onChange={setDelivery}
          classContainer={styles.listShipping}
          CustomItem={DeliveryItem}
          valueData={deliveryData}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.listSummary}>
            <Typography variant="title" type="bold" letter="capitalize">
                Total
            </Typography>
            <Typography variant="title" type="bold" letter="uppercase">
                IDR 200.000
            </Typography>
        </div>
        <Button className={styles.btnSave}>
          {t("checkout:placeOrder")}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
