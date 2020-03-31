import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, GRAY_SECONDARY, WHITE } from "../../../theme/colors";
import { FlexColumn, FlexRow, CreatePadding, CreateMargin, CenterAbsolute } from "../../../theme/mixins";
import { FONT_10 } from "../../../theme/typography";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%",
    ...FlexColumn,
    position : 'relative'
  },
  headContainer: {
    height: "70vh",
    position: "relative",
    backgroundColor: GRAY_PRIMARY,
    width : '100%'
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3
  },

  body : {
      ...CreatePadding(15,30,30,30),
      ...FlexColumn
  },

  footer: {
    ...FlexRow,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-arround",
    position: "fixed",
    bottom: 0,
    left : 0,
    ...CenterAbsolute,
    backgroundColor: WHITE,
    opacity : 0.7,
    ...CreatePadding(20, 20, 20, 20)
  },
  btnAddToCard: {
    ...CreateMargin(0, 8, 0, 0),
    width: "80%",
    [theme.breakpoints.up("sm")]: {
        width: 316
      },
    height: 41,
    bottom: 0,
    left : 0,
    ...CenterAbsolute,
    color : WHITE,
  },
  textBtnAddToCard : {
    fontSize : 16,
    color : WHITE,
  }

}));

export default useStyles;
