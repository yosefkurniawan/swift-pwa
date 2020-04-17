import { makeStyles } from '@material-ui/core';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import { Centering, CreateMargin } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        width: 47,
        height: 47,
        borderRadius: 100,
        border: `1px solid ${GRAY_PRIMARY}`,
        ...Centering,
        ...CreateMargin(10, 5, 5, 10),
    },
    active: {
        border: `3px solid ${PRIMARY}`,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 13,
        color: GRAY_PRIMARY,
    },
    labelActive: {
        color: PRIMARY,
    },
}));
