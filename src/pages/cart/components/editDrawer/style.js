import { makeStyles } from "@material-ui/core";
import { FlexColumn, CreatePadding } from "@theme/mixins";
const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        ...FlexColumn,
        ...CreatePadding(0, 18, 18, 18),
        marginBottom: 50
    },
}));

export default useStyles;
