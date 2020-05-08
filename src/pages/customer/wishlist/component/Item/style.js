import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY } from '@theme/colors';
import { FlexColumn, FlexRow } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        ...FlexRow,
        alignItems: 'center',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    cardImage: {
        width: 127,
        height: 156,
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
