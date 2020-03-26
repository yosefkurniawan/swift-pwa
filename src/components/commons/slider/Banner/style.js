import { makeStyles } from "@material-ui/core/styles";
import { WHITE, PRIMARY } from "../../../../theme/colors";
const useStyles = makeStyles(theme => ({
  caraousel: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  dots: {
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-arround",
    bottom: "5em",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  dotsItem: {
    width: 17,
    height: 17,
    border: `3px solid ${WHITE}`,
    borderRadius: 100,
    backgroundColor: "transparent",
    margin: 5,
    cursor: "pointer"
  },
  dotActive: {
    backgroundColor: PRIMARY
  },
  hide: {
    display: "none"
  },
  imageSlider: {
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh"
  }
}));

export default useStyles;
