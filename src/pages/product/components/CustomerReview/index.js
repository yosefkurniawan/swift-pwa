import useStyles from "./style";
import Typography from "@components/Typography";
import moment from "moment";
import RatingStar from "../RatingStar";

const CustomerReview = ({}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.customerContainer}>
          <div className={styles.imgContainer}>
            <img src="/assets/img/noun_Image.svg" />
          </div>
          <div className={styles.customerProfile}>
            <Typography
              variant="span"
              type="bold"
              letter="uppercase"
              className="clear-margin-padding"
            >
              Customer Name
            </Typography>
            <Typography
              type="regular"
              variant="p"
              letter="capitalize"
              className="clear-margin-padding"
            >
              {moment().format("DD/M/YYYY")}
            </Typography>
          </div>
        </div>

        <div>
          <RatingStar value={4} />
        </div>
      </div>
      <div className={styles.content}>
        <Typography variant="p" type="regular" align="left">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.`}
        </Typography>
      </div>
    </div>
  );
};

export default CustomerReview;
