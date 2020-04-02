import {useState} from "react";
import useStyles from "../style";
import { Box } from "@material-ui/core";
import Typography from "../../../commons/Typography";
import Button from "../../../commons/Button";
import Item from "./item";
import CrossSell from "./crosssell";
import Link from "next/link";
import EditDrawer from "./editDrawer";

const Cart = (props) => {
    const {t} = props;
    const styles = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const toggleEditDrawer = () => {
        setOpenEditDrawer(!openEditDrawer);
    }

    //@TODO: get the real cart data
    const data = [1,2,3];
    
    if(data.length) {
        return (
            <>
                <Box className={styles.container}>
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarCounter}>
                            <Typography variant="p" type="reguler">
                                <span>2</span> {t("cart:counter:text")}
                            </Typography>
                        </div>
                        <div className={styles.toolbarActions}>
                            <Button
                                variant="outlined"
                                className={styles.toolbarButton}
                                onClick={toggleEditMode}
                            >
                                {editMode ? (
                                    <>{t("common:button:save")}</>
                                ) : (
                                    <>{t("common:button:edit")}</>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <Item
                            editMode={editMode}
                            toggleEditDrawer={toggleEditDrawer}
                            {...props}
                        />
                        <Item
                            editMode={editMode}
                            toggleEditDrawer={toggleEditDrawer}
                            {...props}
                        />
                    </div>
                </Box>
                <CrossSell {...props} />
                <EditDrawer
                    open={openEditDrawer}
                    toggleOpen={toggleEditDrawer}
                    {...props}
                />
            </>
        );
    }else{
        return (
            <Box className={styles.container}>
                <Typography variant="span" type="reguler" align="center">
                    <p className={styles.emptyCart}>{t("cart:empty:text")}</p>
                </Typography>
                <Link href="/">
                    <Button className={styles.toolbarButton}>
                        {t("common:button:continueShopping")}
                    </Button>
                </Link>
            </Box>
        );
    }
};

export default Cart;
