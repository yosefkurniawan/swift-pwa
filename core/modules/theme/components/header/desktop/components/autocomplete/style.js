import { makeStyles } from '@material-ui/core/styles';

import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    listContainer: {
        height: 75,
        paddingTop: 10,
        width: '100%',
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    firstListContainer: {
        height: 100,
    },
    topTitle: {
        display: 'block',
        width: '100%',
        height: '20px',
        paddingLeft: '0px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '10px',
    },
    imageContainer: {
        float: 'left',
        marginRight: 20,
    },
    img: {
        width: '50px',
        height: 'auto',
    },
    title: {
        paddingTop: 0,
        paddingBottom: '0rem',
        textTransform: 'uppercase',
        fontSize: 10,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    titleSeller: {
        paddingTop: 2,
        paddingBottom: 5,
        textTransform: 'uppercase',
        fontSize: 10,
    },
    infoSeller: {
        display: 'flex',
    },
    iconSeller: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
        marginRight: 5,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    address: {
        fontSize: 10,
    },
    listContainerCategory: {
        width: '100%',
        padding: 10,
        paddingLeft: 0,
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    topTitleCategory: {
        paddingLeft: '0px',
    },
    breadcrumbs: {
        paddingBottom: 5,
        textTransform: 'uppercase',
        color: '#929292',
        fontSize: 10,
        fontStyle: 'italic',
    },
    titleCategory: {
        textTransform: 'uppercase',
        fontSize: 10,
    },
}));

export default useStyles;
