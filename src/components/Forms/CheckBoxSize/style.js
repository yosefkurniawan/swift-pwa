import { makeStyles } from '@material-ui/core';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import { Centering } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        minWidth: 65,
        height: 65,
        marginRight: 8,
        borderRadius: 100,
        border: `1px solid ${GRAY_PRIMARY}`,
        ...Centering,
    },
    active: {
        border: `3px solid ${PRIMARY}`,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 11,
        color: GRAY_PRIMARY,
    },
    labelActive: {
        color: PRIMARY,
    },
}));
