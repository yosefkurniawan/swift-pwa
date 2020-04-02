import { makeStyles } from "@material-ui/core/styles";
import { CreatePadding, CreateMargin } from '@theme/mixins'
import { GRAY_PRIMARY } from "@theme/colors";

const useStyles = makeStyles(theme => ({
    container: {
        ...CreatePadding(10, 10, 10, 10),
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...CreateMargin(0, 0, 18, 0),
        borderBottom: "1px solid " + GRAY_PRIMARY
    },
    leftContainer: {
        position: "absolute",
        left: 0
    },
    rightContainer: {
        position: "absolute",
        right: 0
    },
    centerContainer: {
        alignItems: "center",
        textAlign: "center",
        flexGrow: 1,
        ...CreatePadding(0, "20%", 0, "20%")
    },
    backIcon: {
        fontSize: 30
    },
    headerAbsolute: {
        position: "absolute",
        zIndex: 1,
        borderBottom: "none"
    },
    headerRelative: {
        position: "relative"
    }
}));

export default useStyles;