import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, GRAY_SECONDARY } from '@theme_color';
import { CreatePadding, FlexColumn, FlexRow } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
    },
    headContainer: {
        position: 'relative',
        backgroundColor: GRAY_PRIMARY,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        borderBottom: 'none',
    },
    filterContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...CreatePadding(15, 15, 15, 15),
    },
    countProductText: {
        justifyContent: 'flex-start',
        ...FONT_10,
    },
    filterBtnContainer: {
        justifyContent: 'flex-end',
        ...FlexRow,
        alignItems: 'center',
        fontSize: 12,
    },
    btnFilter: {
        marginRight: -20,
        padding: 0,
    },
    iconFilter: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 50, 0),
    },
    titleContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    sellerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    imageContainer: {
        float: 'left',
        marginRight: 20,
    },
    img: {
        width: '60px',
        height: 'auto',
        borderRadius: '50%',
    },
    listContainerCategoryMobile: {
        width: '100%',
        padding: 10,
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    breadcrumbsMobile: {
        paddingBottom: 5,
        textTransform: 'uppercase',
        color: '#929292',
        fontSize: 10,
        fontStyle: 'italic',
    },
    listContainerCategory: {
        width: '100%',
        display: 'flex',
        padding: 5,
        paddingLeft: 10,
    },
    breadcrumbs: {
        textTransform: 'uppercase',
        color: '#929292',
        fontSize: 10,
        fontStyle: 'italic',
        paddingRight: 10,
    },
    titleCategory: {
        textTransform: 'uppercase',
        fontSize: 10,
    },
    topTitle: {
        display: 'block',
        width: '100%',
        height: '20px',
        paddingLeft: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '8px',
    },
    wrapper: {
        paddingTop: 15,
    },
    wrapperSkeleton: {
        padding: 15,
    },
    sellerLogo: {
        [theme.breakpoints.up('xs')]: {
            width: '60px !important',
            height: '60px !important',
            '& img': {
                height: '75% !important',
            },
        },
    },
}));

export default useStyles;
