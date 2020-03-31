import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, PRIMARY, WHITE } from "../../../../theme/colors";
import { Centering } from "../../../../theme/mixins";

export default makeStyles(theme => ({
    container : {
        width : 53,
        height : 53,
        borderRadius : 100,
        border : `1px solid ${GRAY_PRIMARY}`,
        backgroudColor : WHITE,
        ...Centering,
    },
    active : {
        border : `3px solid ${PRIMARY}`
    },
}))