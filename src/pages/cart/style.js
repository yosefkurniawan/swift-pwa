import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, GRAY_SECONDARY, PRIMARY } from "@theme/colors";
import {
    FlexColumn,
    FlexRow,
    CreatePadding,
    CreateMargin
} from "@theme/mixins";
import { FONT_10, FONT_BIG } from "@theme/typography";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        ...FlexColumn,
        ...CreatePadding(0, 18, 18, 18)
    },
    iconClose: {
        ...FONT_BIG
    },
    body: {
        ...FlexColumn,
        position: "relative",
        height: "100%"
    },
    slider: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        ...CreateMargin(30, 0, 30, 0)
    },
    toolbar: {
        ...FlexRow
    },
    items: {
        ...FlexColumn
    },
    item: {
        ...FlexRow
    }
}));

export default useStyles;