import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, GRAY_PRIMARY } from '@theme/colors';
import { CreateMargin, CreatePadding } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    appBarBottom: {
        bottom: 0,
        top: 'auto',
        backgroundColor: 'white',
    },
    pageTitle: {
        fontWeight: 700,
        textAlign: 'center',
        color: PRIMARY,
        textTransform: 'uppercase',
        position: 'absolute',
        left: '50px',
        right: '50px',
    },
    address_shipping: {
        ...CreatePadding(15, 15, 15, 15),
        width: '100%',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        margin: 0,
    },
    address_billing: {
        padding: '20px 15px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    address_title: {
        color: PRIMARY,
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '5px',
    },
    address_content: {
        fontSize: '12px',
        marginBottom: '15px',
    },
    address_text: {
        fontSize: '12px',
    },
    address_edit: {
        textDecoration: 'underline',
        fontSize: '12px',
    },
    address_action: {
        padding: '15px',
    },
    address_add: {
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid black',
        fontSize: '12px',
    },
    address_save: {
        width: '100%',
        backgroundColor: PRIMARY,
        color: 'white',
        textTransform: 'uppercase',
    },
    address_drawer: {
        backgroundColor: 'white',
        left: 0,
        width: '100%',
    },
    address_form: {
        padding: '15px',
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        ...CreateMargin(30, 0, 30, 0),
    },
}));

export default useStyles;
