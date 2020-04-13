import { makeStyles } from "@material-ui/core";

import { CreatePadding, FlexColumn, CreateMargin, CenterAbsolute, Centering } from '@theme/mixins'
import { GRAY_PRIMARY } from '@theme/colors'

export default makeStyles(theme => ({
    container : {
        height : '100%',
        width : '100%',
        ...FlexColumn,
        alignItems : 'center',
        ...CreatePadding(10,30,30,30),
    },
    btnSigin : {
        ...CreateMargin(30,0,10,0),
        ...CenterAbsolute
    },
    footer : {
        ...CreateMargin(40,0,0,0),
        ...FlexColumn,
        width : '100%',
        height : 'auto',
    },

    passwordStrength : {
        background : GRAY_PRIMARY,
        width : '100%',
        height : 30,
        display : 'flex',
        alignItems : 'center'
    }
}))