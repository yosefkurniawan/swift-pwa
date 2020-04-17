import { makeStyles } from '@material-ui/core';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import {
    Centering,
    CreateBorder,
    CreatePadding,
    FlexColumn,
    FlexRow,
    CreateMargin,
} from '@theme/mixins';

export default makeStyles(() => ({
    root: {
        ...FlexColumn,
        height: '100vh',
        width: '100%',
    },
    container: {
        width: '100%',
        height: 'auto',
        paddingBottom: 150,
    },
    block: {
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(30, 30, 30, 30),
    },
    addressContainer: {
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressText: {
        ...FlexColumn,
        maxWidth: '60%',
    },
    listShipping: {
        ...CreateBorder('1px', 0, 0, 0, PRIMARY),
    },
    fieldPoinContainer: {
        ...FlexRow,
        alignItems: 'center',
        ...CreateMargin(10, 0, 15, 0),
    },
    btnAplly: {
        height: 30,
        ...Centering,
        marginLeft: 5,
    },
    btnPoint: {
        maxWidth: 120,
        ...Centering,
        padding: 5,
    },
    cardPoint: {
        ...CreateMargin(30, 0, 30, 0),
        ...CreatePadding(17, 17, 17, 17),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_PRIMARY),
        borderRadius: 10,
    },
    pointText: {
        fontSize: 20,
        ...CreateMargin(0, 0, 0, 5),
    },
    btnBalanceGift: {
        ...CreateMargin(-25, 0, 0, -5),
    },
    rmBorder: {
        border: 'none',
    },
}));
