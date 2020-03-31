import { makeStyles } from "@material-ui/core";
import { Centering, FlexRow } from "../../../../../theme/mixins";
import { WHITE } from "../../../../../theme/colors";

export default makeStyles(theme => ({
  container: {
    position: "absolute",
    right: "0",
    top: "0",
    height: "100vh",
    zIndex: 5,
    width: 35
  },

  openContainer: {
    width: 175
  },

  btnOpen: {
    width: 144,
    height: 33,
    ...Centering,
    borderRadius: 10,
    backgroundColor: WHITE,
    transform: "rotate(-90deg)",
    position: "absolute",
    top: "35vh",
    right: -55
  },
  btnOpeActive: {
    right: 120
  },


  body: {
    height: "100%",
    width: "40vw",
    [theme.breakpoints.up("sm")]: {
      width: '30vw'
    },
    backgroundColor: 'transparent',
    boxShadow: "5px 0px 5px 3px #0000001A"
  }
}));
