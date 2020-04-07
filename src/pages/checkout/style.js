import { makeStyles } from "@material-ui/core";
import { PRIMARY, GRAY_PRIMARY } from "@theme/colors";
import {
  CreateMargin,
  CreatePadding,
  CreateBorder,
  FlexRow,
  FlexColumn,
  CenterAbsolute,
  CreateShadow
} from "@theme/mixins";
export default makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    position: "relateive",
  },
  block: {
    ...CreateBorder(0, 0, "1px", 0, GRAY_PRIMARY),
    ...CreatePadding(30, 30, 30, 30),
  },
  addressContainer: {
    ...FlexRow,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressText: {
    ...FlexColumn,
    maxWidth: "60%",
  },
  listShipping: {
    ...CreateBorder("1px", 0, 0, 0, PRIMARY),
  },
  footer : {
    ...FlexColumn,
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    ...CreateShadow('top',3),
    ...CreatePadding(20, 20, 20, 20),
  },
  btnSave: {
    ...CreateMargin(13, 8, 0, 0),
    ...CenterAbsolute,
    width: 316,
    maxWidth : '85%',
    height: 41
  },
  listSummary : {
      ...FlexRow,
      justifyContent : 'space-between'
  }
}));
