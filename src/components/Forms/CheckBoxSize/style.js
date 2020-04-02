import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, PRIMARY } from "@theme/colors";
import { Centering } from "@theme/mixins";

export default makeStyles(theme => ({
    container : {
        width : 53,
        height : 53,
        borderRadius : 100,
        border : `1px solid ${GRAY_PRIMARY}`,
        ...Centering,
    },
    active : {
        border : `3px solid ${PRIMARY}`
    },
    label : {
        fontWeight : 'bold',
        fontSize : 13,
        color : GRAY_PRIMARY
    },
    labelActive : {
        color : PRIMARY
    }
}))