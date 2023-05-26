import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: 'unset !important',
    },
    image: {
        width: ({ width }) => `${width} !important`,
        height: ({ height }) => `${height} !important`,
        position: 'relative !important',
        objectFit: 'cover',
    },
}));

export default useStyles;
