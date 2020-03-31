import useStyles from "./style";
import Typography from "../../../../commons/Typography";
import classNames from "classnames";
import { Slide, Drawer } from "@material-ui/core";

const RightDrawer = ({ open = false, setOpen = () => {} }) => {
  const styles = useStyles();
  const btnOpenStyle = classNames(styles.btnOpen, styles.btnOpen)
  return (
    <div className={styles.container}>
      <div className={styles.btnOpen} onClick={setOpen}>
        <Typography
          variant="span"
          letter="uppercase"
          type="reguler"
          align="center"
        >
          shop the look
        </Typography>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={setOpen}
        hideBackdrop={true}
        className={styles.drawerContainer}
        color="transparent"
      >
        <div className={btnOpenStyle} onClick={setOpen}>
          <Typography
            variant="span"
            letter="uppercase"
            type="reguler"
            align="center"
          >
            shop the look
          </Typography>
        </div>
        <div className={styles.body}></div>
      </Drawer>
    </div>
  );
};

export default RightDrawer;
