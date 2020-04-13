import { makeStyles } from "@material-ui/core";

import { CreatePadding, FlexColumn, CreateMargin, CenterAbsolute, Centering } from '@theme/mixins'
import {  } from '@theme/colors'

export default makeStyles(theme => ({
    container : {
        height : '100%',
        width : '100%',
        ...FlexColumn,
        alignItems : 'center',
        ...CreatePadding(10,30,30,30),
    },
    btnSigin : {
        ...CreateMargin(16,0,10,0)
    },
    footer : {
        zIndex : 0,
        width : '100%',
        ...CreatePadding(30,30,30,30),
        ...Centering,
        position : 'absolute',
        bottom : 0
    }
}))