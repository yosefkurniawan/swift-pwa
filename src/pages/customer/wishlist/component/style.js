import { makeStyles } from "@material-ui/core/styles";
import { WHITE, PRIMARY, GRAY_PRIMARY } from "@theme/colors";
import { CreateMargin, CreatePadding } from "@theme/mixins";

const useStyles = makeStyles(theme => ({
    colorPrimary: {
        color: PRIMARY
    },
    appBar: {
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1
    },
    pageTitle:{
        fontWeight: 700,
        textAlign: "center",
        color: PRIMARY,
        textTransform: "uppercase",
        position: "absolute",
        left: "50px",
        right: "50px"
    },
    wishlistWrapper:{
        // paddingTop: "50px"
    },
    card: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        minHeight: "180px",
        borderRadius: "0",
        boxShadow: "none"
    },
    cardImage: {
        flex: "0 0 35%",
    },
    cardContent: {
        flex: "0 0 65%",
        alignSelf: "center",
        display: "flex",
        textAlign: "center",
        justifyContent: "center"
    },
    cardProductDetails: {
        flex: "0 0 70%"
    },
    cardProductAction: {
        flex: "0 0 30%",
        alignSelf: "center",
        justifyContent: "center"
    },
    productAddToCart: {
        background: PRIMARY,
        color: WHITE,
        fontSize: "12px"
    },
    productAddAllToCart:{
        width: "100%",
        backgroundColor: PRIMARY,
        color: "white",
        textTransform: "uppercase"
    },
}));

export default useStyles;