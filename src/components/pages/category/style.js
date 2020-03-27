import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, GRAY_SECONDARY } from "../../../theme/colors";
import { FlexColumn, FlexRow, CreatePadding } from "../../../theme/mixins";
import { FONT_10 } from "../../../theme/typography";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%",
    ...FlexColumn
  },
  headContainer: {
    height: "40vh",
    position: "relative",
    backgroundColor: GRAY_PRIMARY
  },
  header: {
    position: "relative",
    top: 0,
    left: 0,
    zIndex: 3
  },
  filterContainer: {
    ...FlexRow,
    justifyContent: "space-between",
    alignItems: "center",
    ...CreatePadding(15, 15, 15, 15)
  },
  countProductText: {
    justifyContent: "flex-start",
    ...FONT_10
  },
  filterBtnContainer: {
    justifyContent: "flex-end",
    ...FlexRow,
    alignItems: "center",
    fontSize: 12
  },
  btnFilter: {
    marginRight: -20,
    padding : 0
  },
  iconFilter: {
    fontSize: 18,
    fontWeight: "reguler"
  },
  tabs: {
    boxShadow: "none",
    borderBottom: `1px solid ${GRAY_SECONDARY}`
  },
  productContainer : {
      overflow : 'hidden',
      ...CreatePadding(0,0,50,0)
  }
}));

export default useStyles;
