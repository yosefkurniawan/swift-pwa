import { makeStyles } from '@material-ui/core';
import {
    CreatePadding,
    FlexColumn,
    Centering,
    CreateMargin,
    ClearMarginPadding,
    FlexRow,
} from '@theme/mixins';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';

export default makeStyles((theme) => ({
    container: {},
    itemContainer: {
        width: '100%',
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        ...CreateMargin(0, 0, 16, 0),
    },
    imgItem: {
        width: '100%',
        ...Centering,
        height: 288,
        backgroundColor: GRAY_PRIMARY,
    },
    imgProduct: {
        width: '100%',
        height: '100%',
    },
    detailItem: {
        height: 'auto',
        ...CreatePadding(14, 14, 14, 14),
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(28, 14, 14, 14),
        },
        position: 'relative',
    },
    descItem: {
        ...FlexColumn,
        maxWidht: '80%',
    },
    clearMarginPadding: {
        ...ClearMarginPadding,
    },
    btnFeed: {
        position: 'absolute',
        right: 12,
        top: 14,
        ...ClearMarginPadding,
        width: 20,
        height: 20,
        marginRight: -20,
    },
    iconFeed: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
    },
    iconActive: {
        color: PRIMARY,
    },
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
}));
