import { makeStyles } from "@material-ui/core/styles";
import { WHITE, GRAY_PRIMARY, PRIMARY } from "../../../theme/colors";
import { Centering } from "../../../theme/mixins";
const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: '100%',
    position : 'relative',
    backgroundColor : WHITE,
    padding : 10,
  },
  imageContainer : {
      minWidth : 345,
      maxWidth : '100%',
      height : 168,
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : GRAY_PRIMARY
  },
  contentContainer : {
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'center',
      padding : '45px 15px'
  },
  textBtn : {
      paddingBottom : 5,
      borderBottom : `2px solid ${PRIMARY}`
  }
}));

export default useStyles;
