import Header from "../../../../commons/Header";
import useStyles from "../style";
import Typography from "../../../../commons/Typography";
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
        <Button onClick={back}>
            <CloseIcon className={styles.iconClose} />
        </Button>
    );
};

const HeaderCenterComponent = ({ title }) => {

    return (
        <Typography variant="title" type="bold" letter="uppercase">
            Custom Header
        </Typography>
    );
};

const CustomHeader = ({ pageConfig }) => {
    const styles = useStyles();

    return (
        <Header
            LeftComponent={<HeaderLeftComponent />}
            CenterComponent={<HeaderCenterComponent />}
        />
    );
};

export default CustomHeader;
