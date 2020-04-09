import { makeStyles } from "@material-ui/core";

import { CreatePadding, FlexColumn, CreateMargin, FlexRow, Centering } from '@theme/mixins'
import {  } from '@theme/colors'

export default makeStyles(theme => ({
    container : {
        width: "100%",
        height: "80vh",
        ...Centering,
        position: "relative",
        ...CreatePadding(30, 30, 30, 30),
        overflow: "hidden",
      
    },
    btnSigin : {
        ...CreateMargin(50,0,10,0)
    },

    formOtp : {
        ...FlexRow,
        justifyContent : 'center',
        alignItems : 'center'
    },
    fieldOtp : {
        // ...CreateMargin(10,10,10,10),
        // width : 50,
        // height : 50,
        width : 120,
        fontSize : 24,
        textAlign : 'center'
    },
    inputField : {
        textAlign : 'center'
    }
}))