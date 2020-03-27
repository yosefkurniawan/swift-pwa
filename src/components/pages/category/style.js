import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY } from "../../../theme/colors";
import { FlexColumn } from "../../../theme/mixins";

const useStyles = makeStyles(theme => ({
    container : {
        width : '100rem',
        height : '100%',
        ...FlexColumn
    },
    headContainer : {
        height : '40em',
        position : 'relative',
        backgroundColor : GRAY_PRIMARY
    },
    header : {
        position : 'relative',
        top : 10,
        left : 16,
        zIndex : 3
    }
}))

export default useStyles