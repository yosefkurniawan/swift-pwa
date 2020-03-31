import useStyles from "../style";
import { Button, Box } from "@material-ui/core";

const Cart = ({ t }) => {
    const styles = useStyles();
    
    return (
        <>
            <Box className={styles.container}>
                <div className="toolbar">
                    <div>
                        <span>2</span>
                        {t("cart:counter:text")}
                    </div>
                    <div>
                        <Button>{t("common:edit")}</Button>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Cart;
