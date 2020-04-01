import { makeStyles } from "@material-ui/core";
import { FlexRow } from "../../../../../theme/mixins";
import { GRAY_PRIMARY, PRIMARY } from "../../../../../theme/colors";

export default makeStyles(theme => ({
    container : {
        ...FlexRow,
    },
    iconBtn : {
        marginRight : 0,
        padding : 0
    },
    icon : {
        fontSize : 14,
        color : GRAY_PRIMARY
    },
    iconActive : {
        fontSize : 14,
        color : PRIMARY
    }
}))