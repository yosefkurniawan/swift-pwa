import { makeStyles } from '@material-ui/core';
import {
    FlexColumn, CreatePadding, Centering, CreateMargin,
} from '@theme/mixins';

import { GRAY_LIGHT } from '@theme/colors';

export default makeStyles({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        alignItems: 'center',
    },
    authBlock: {
        ...FlexColumn,
        justifyContent: 'space-between',
        width: '100%',
        height: '65vh',
        ...CreatePadding(15, 30, 15, 30),
        ...Centering,
        textAlign: 'center',
    },
    btnSigin: {
        ...CreateMargin(5, 0, 35, 0),
    },
    span: {
        width: '100%',
        height: 20,
        background: GRAY_LIGHT,
    },
});
