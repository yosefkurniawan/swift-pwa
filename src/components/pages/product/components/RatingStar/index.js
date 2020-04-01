import useStyles from "./style";
import { IconButton } from "@material-ui/core";
import { Star, StarOutlined } from "@material-ui/icons";

const RatingStar = ({
  value = 1,
  maxvalue = 5,
  onChange = () => {},
  disabled = true
}) => {
  const styles = useStyles();
  const icon = [];
  for (let ind = 1; ind <= maxvalue; ind++) {
    if (ind <= value) {
      icon.push(
        <IconButton className={styles.iconBtn} key={ind}>
          <Star className={styles.iconActive} />
        </IconButton>
      );
    } else {
      icon.push(
        <IconButton className={styles.iconBtn} key={ind}>
          <Star className={styles.icon} />
        </IconButton>
      );
    }
  }
  return (
    <div className={styles.container}>
      {icon.map((Item, index) => (
        Item
      ))}
    </div>
  );
};


export default RatingStar
