import { makeStyles } from "@material-ui/core/styles";
import { Centering, CreatePadding, CreateMargin } from "../../../theme/mixins";
import { WHITE } from "../../../theme/colors";
const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%"
  },
  body: {
    ...Centering,
    ...CreatePadding("auto", 80, 80, 80),
    justifyContent: "space-between"
  },
  item: {
    ...CreateMargin(20, 0, 40, 0),
    ...Centering
  },
  appBar: {
    position: "relative",
    backgroundColor: WHITE,
    ...CreatePadding(10, 10, 10, 10),
    boxShadow: "none"
  },
  iconClose : {
    size : 30
  }
}));

export default useStyles;
