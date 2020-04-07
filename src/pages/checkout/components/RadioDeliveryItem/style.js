import { makeStyles } from "@material-ui/core";
import { PRIMARY, GRAY_PRIMARY } from "@theme/colors";
import {
  CreateMargin,
  CreatePadding,
  CreateBorder,
  FlexRow,
  FlexColumn,
} from "@theme/mixins";

export default makeStyles(theme => ({
    root: {
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
        ...FlexRow
    },
    labelContainer : {
        ...FlexRow,
        justifyContent : 'space-between',
        width : '100%',
        alignItems : 'center'
    },
    labelContainerActive : {
        fontWeight : 'bold'
    }
}))