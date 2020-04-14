import { makeStyles } from "@material-ui/core";
import { CreatePadding, FlexColumn, FlexRow } from '@theme/mixins'

export default makeStyles(theme => ({
    container : {
        ...FlexColumn,
        ...CreatePadding(0,30,30,30)
    },
    editContainer : {
        ...FlexColumn,
        ...CreatePadding(0,0,30,0)
    }
}))