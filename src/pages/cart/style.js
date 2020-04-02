import { makeStyles } from "@material-ui/core";
import { PRIMARY, WHITE } from "@theme/colors";
import {
    FlexColumn,
    FlexRow,
    CreatePadding,
    CreateMargin
} from "@theme/mixins";
import { FONT_14, FONT_BIG } from "@theme/typography";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        ...FlexColumn,
        ...CreatePadding(0, 18, 18, 18),
        marginBottom: 50
    },
    iconClose: {
        ...FONT_BIG
    },
    toolbar: {
        ...FlexRow,
        marginBottom: 7
    },
    toolbarCounter: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    toolbarButton: {
        fontSize: 11
    },
    items: {
        ...FlexColumn
    },
    item: {
        ...FlexRow,
        position: "relative",
        marginTop: 20
    },
    itemImgWrapper: {
        flex: 1
    },
    itemImg: {
        width: "100%",
        display: "block"
    },
    itemInfo: {
        flex: 2,
        ...CreatePadding(0, 12, 0, 12),
        position: "relative",
        paddingBottom: 30
    },
    itemName: {
        textDecoration: "none",
        color: PRIMARY,
        marginBottom: 4,
        display: "inline-block"
    },
    itemPrice: {
        position: "absolute",
        bottom: 5,
        left: 12,
        fontWeight: "bold"
    },
    itemActions: {
        position: "absolute",
        right: 12
    },
    iconBtn: {
        display: "block",
        padding: 9,
        color: WHITE,
        background: "#000",
        margin: "5px 0",
        "&:hover": {
            background: "#fff",
            boxShadow: "inset 0px 0px 0px 1px " + PRIMARY,
            color: PRIMARY
        }
    },
    icon: {
        fontSize: 14
    },
    crosselTitle: {
        display: "block",
        ...FONT_14
    },
    emptyCart: {
        ...CreateMargin(20, 0, 20, 0)
    }
}));

export default useStyles;