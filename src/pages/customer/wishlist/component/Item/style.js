import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE } from '@theme/colors';
import { FlexColumn, FlexRow, Centering } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        ...FlexRow,
        alignItems: 'center',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    imgItem: {
        width: 127,
        ...Centering,
        height: 156,
        backgroundColor: WHITE,
    },
    imgProduct: {
        width: 'auto',
        height: '100%',
    },
    content: {
        ...FlexColumn,
        alignItems: 'center',
        textAlign: 'center',
        width: '60%',
    },
    btnAdd: {
        marginTop: 10,
    },
}));

export default useStyles;
