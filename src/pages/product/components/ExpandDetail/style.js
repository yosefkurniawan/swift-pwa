import { makeStyles } from "@material-ui/core";
import { CreateBorder, CreateMargin, CreatePadding } from "../@theme/mixins";
import { PRIMARY } from "../@theme/colors";

export default makeStyles(theme => ({
    root: {
      width: "100%",
      ...CreateMargin(15,0,15,0),
      ...CreateBorder('1px',0,0,0,PRIMARY),
    },
    expandContainer : {
        boxShadow : 'none',
        borderRadius : 'none',
        margin : 0,
    },
    headerExpand : {
        padding : 0,
        height : 40,
        ...CreateBorder(0,0,'1px',0,PRIMARY),
    },
    bodyExpand : {
        ...CreatePadding(0,0,20,0),
        margin : 0
    },
    headerOpen : {
        borderBottom : 'none !important'
    },
    bodyOpen : {
        ...CreateBorder(0,0,'1px',0,PRIMARY),
    },
    icon : {
        fontSize : 16,
        color : PRIMARY
    }
  }));