import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, PRIMARY, WHITE, GRAY_SECONDARY } from "../../../../theme/colors";
import { CreateMargin, FlexColumn } from "../../../../theme/mixins";

const useStyles = makeStyles({
  continer : {
    ...CreateMargin(0,0,0,0),
    ...FlexColumn
  },
});

export default useStyles