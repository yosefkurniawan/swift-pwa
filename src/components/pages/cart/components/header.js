import Header from "../../../commons/Header";
import useStyles from "../style";
import Typography from "../../../commons/Typography";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const HeaderLeftComponent = () => {
    const styles = useStyles();
    const route = useRouter;
    const back = () => {
        route.back();
    };
    return (
        <Button onClick={back} className={styles.btnBack}>
            <CloseIcon className={styles.iconClose} />
        </Button>
    );
};

const HeaderCenterComponent = ({ title }) => {
    const styles = useStyles();

    return (
        <Typography variant="title" type="bold" letter="uppercase">
            {title}
        </Typography>
    );
};

const CartHeader = ({pageConfig, t}) => {
    const styles = useStyles();

    return (
        <Header
            className={styles.header}
            LeftComponent={<HeaderLeftComponent />}
            CenterComponent={
                <HeaderCenterComponent title={pageConfig.title} />
            }
        />
    );
};

export default CartHeader;