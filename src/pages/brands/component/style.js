import { makeStyles } from '@material-ui/core/styles';
import {
    Centering, CreateMargin,
} from '@theme/mixins';

const useStyles = makeStyles(() => ({
    title: {
        ...CreateMargin(0, 0, 15, 0),
        ...Centering,
    },
    listBrand: {
        textAlign: 'left',
        fontSize: '10px',
    },
}));

export default useStyles;
