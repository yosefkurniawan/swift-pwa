import { makeStyles } from '@material-ui/core';
import { WHITE } from '@theme/colors';
import { CreateShadow } from '@theme/mixins';

export default makeStyles((theme) => ({
    selectBox: {
        zIndex: 5,
        maxHeight: 300,
        [theme.breakpoints.down('sm')]: {
            maxHeight: 250,
        },
        overflow: 'auto',
        background: WHITE,
        ...CreateShadow('all', 5),
    },
}));
