import Typography from "@components/Typography";
import Button from "@components/Button";
import Radio from "@components/Forms/Radio";
import DeliveryItem from "./RadioDeliveryItem";
import TextField from "@components/Forms/TextField";
import classNames from "classnames";

import useStyles from "../style";
import Summary from "./Summary";
import PaymentList from "./PaymentList";

const deliveryData = [
  { label: "Standart", value: { name: "standart", price: 1000 } },
  { label: "Express", value: { name: "express", price: 2500 } },
];

const FieldPoint = ({ onChange = () => {}, value = "", placeholder = "" }) => {
  const styles = useStyles();
  return (
    <div className={styles.fieldPoinContainer}>
      <TextField value={value} onChange={onChange} placeholder={placeholder} />
      <Button variant="outlined" className={styles.btnAplly}>
        <Typography variant="p" type="bold" letter="uppercase">
          Aplly
        </Typography>
      </Button>
    </div>
  );
};

const Checkout = (props) => {
  const { t } = props;
  const styles = useStyles();
  const [delivery, setDelivery] = React.useState([]);
  return (
    <div className={styles.root}>
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
            {t("checkout:deliveryMethod")}
          </Typography>
          <Radio
            value={delivery}
            onChange={setDelivery}
            classContainer={styles.listShipping}
            CustomItem={DeliveryItem}
            valueData={deliveryData}
          />
        </div>
        <div className={styles.block}>
          <Typography variant="title" type="bold" letter="uppercase">
            {t("checkout:payment")}
          </Typography>
          <Typography variant="p">{t("checkout:paymentSubtitle")}</Typography>
          <PaymentList />
        </div>
        <div className={classNames(styles.block, styles.rmBorder)}>
          <FieldPoint placeholder="Promo Code" />
          <FieldPoint placeholder="Gift Card Number" />
          <Button variant="text" className={styles.btnBalanceGift}>
            <Typography variant="p" decoration="underline" letter="capitalize">
              Check Balance
            </Typography>
          </Button>
          <div className={styles.cardPoint}>
            <div className="column">
              <Typography variant="span" letter="capitalize">
                My Point
              </Typography>
              <Typography
                variant="title"
                type="bold"
                className={styles.pointText}
              >
                100.000
              </Typography>
            </div>
            <Button variant="outlined" className={styles.btnPoint}>
              <Typography variant="p" type="bold" letter="uppercase">
                USE MY POIN
              </Typography>
            </Button>
          </div>
          <div className={styles.cardPoint}>
            <div className="column">
              <Typography variant="span" letter="capitalize">
                My Credit
              </Typography>
              <Typography
                variant="title"
                type="bold"
                className={styles.pointText}
              >
                100.000
              </Typography>
            </div>
            <Button variant="outlined" className={styles.btnPoint}>
              <Typography
                variant="p"
                type="bold"
                letter="uppercase"
                align="center"
              >
                use my credit
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <Summary {...props} />
    </div>
  );
};

export default Checkout;
