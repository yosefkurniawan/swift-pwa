import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@components/Typography";
import Button from "@components/Button";
import useStyles from "./style";

const EditDrawer = ({t, open,toggleOpen}) => {
    const styles = useStyles();
    const toggleDrawer = (anchor, open) => event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        toggleOpen(!open);
    };
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer("bottom", false)}
            onOpen={toggleDrawer("bottom", true)}
        >
            <div className={styles.container}>
                <Typography variant="p" type="reguler">
                    {t("cart:counter:text")}
                </Typography>
                <p>Color Options here...</p>
                <p>Size Options here...</p>

                <Button className={styles.toolbarButton}>
                    {t("cart:button:saveEdit")}
                </Button>
            </div>
        </SwipeableDrawer>
    );
}

export default EditDrawer;
