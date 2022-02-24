import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE, PRIMARY, GRAY_PRIMARY } from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
    showHide,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightRegular,
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        height: '51px',
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnClose: {
        position: 'absolute',
        left: 10,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    title: {
        justifySelf: 'center',
        ...CreateMargin(16, 0, 16, 0),
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        height: '100%',
    },
    textSearch: {
        ...FlexRow,
        justifyContent: 'space-between',
        ...CreatePadding(0, '15%', 0, 0),
    },
    rmMargin: {
        ...CreateMargin(0, 0, 0, 0),
    },
    result: {
        ...FlexColumn,
        ...CreateMargin(16, 0, 30, 0),
    },
    textValue: {
        ...FlexColumn,
        ...CreateMargin(10, 0, 10, 0),
    },
    ...showHide,
    fieldContainer: {
        ...CreatePadding(10, 30, 10, 30),
        paddingBottom: 18,
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    fieldContainerLast: {
        ...CreatePadding(10, 30, 10, 30),
        paddingBottom: 18,
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        marginBottom: 80,
    },
    last: {
        marginBottom: 70,
    },
    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        backgroundColor: WHITE,
        borderTop: `1px solid ${GRAY_PRIMARY}`,
        ...CreatePadding(20, 20, 20, 20),
    },
    btnSave: {
        display: 'block',
        margin: 'auto',
        width: 'calc(100% - 12px)',
        height: 41,
    },
    btnSavePrice: {
        float: 'right',
    },
    listCategoryWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1fr)',
    },
    listCategory: {
        cursor: 'pointer',
        margin: '0 0 10px 0',
        padding: '0 0 5px 5px',
        listStyleType: 'none',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:active': {
            backgroundColor: '#dedede',
        },
        '&:focus': {
            backgroundColor: '#dedede',
        },
    },
    checkboxCustom: {
        display: 'block',
        paddingRight: 0,
    },
}));

export default useStyles;
