import { Box } from "@material-ui/core";
import Typography from "@components/Typography";
import Button from "@components/Button";
import useStyles from "./style";
import Router from "next/router";
import { Slide } from "@material-ui/core";

const CheckoutDrawer = ({editMode, t}) => {
    const styles = useStyles();

    const handleOnCheckoutClicked = () => {
        Router.push("/checkout");
    };
    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <Box
                position="fixed"
                bottom={0}
                left={0}
                display="flex"
                flexDirection="column"
                width="100%"
                justifyContent="center"
                className={styles.checkoutBox}
            >
                <Box align="center" padding={1}>
                    <Typography
                        variant="span"
                        type="bold"
                        align="center"
                        letter="capitalize"
                        className={styles.subtotal}
                    >
                        {`${t("common:subtotal")} IDR 1.999.000`}
                    </Typography>
                </Box>
                <Box justifyContent="center" display="flex">
                    <Button
                        className={styles.goToCheckout}
                        onClick={handleOnCheckoutClicked}
                    >
                        {t("common:button:checkout")}
                    </Button>
                </Box>
            </Box>
        </Slide>
    );
}

export default CheckoutDrawer;
