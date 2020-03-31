import { makeStyles } from "@material-ui/core/styles";
import { GRAY_PRIMARY, WHITE } from "../../../../theme/colors";
import { Centering, FlexColumn, CreatePadding } from "../../../../theme/mixins";
const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: WHITE
  },
  caraousel: {
    padding: "0 55px"
  },
  slideContainer: {
    padding: "0 15px",
  },
  itemContainer: {
    width: "100%",
    display : 'inline-block',
    height: "100%",
    overflow: 'hidden',
  },
  imgItem: {
    width: "100%",
    ...Centering,
    height : 288,
    backgroundColor: GRAY_PRIMARY
  },
  detailItem: {
    ...FlexColumn,
    justifyContent: "center",
    alignItems: "center",
    height : 'auto',
    ...CreatePadding(16,0,0,0)
      
  }
}));

export default useStyles;
