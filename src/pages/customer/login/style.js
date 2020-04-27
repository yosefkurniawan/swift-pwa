import { makeStyles } from '@material-ui/core';

import {
    CreatePadding, FlexColumn, CreateMargin, Centering,
} from '@theme/mixins';
import { } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        ...CreatePadding(10, 30, 30, 30),
    },
    btnSigin: {
        ...CreateMargin(16, 0, 10, 0),
    },
    footer: {
        zIndex: 0,
        width: '100%',
        ...CreatePadding(30, 30, 30, 30),
        ...Centering,
        position: 'absolute',
        bottom: 0,
    },
    selectLogin: {
        width: '100%',
        ...CreateMargin(0, 0, 15, -15),
    },
}));
