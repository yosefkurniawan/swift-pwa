import makeStyles from '@material-ui/core/styles/makeStyles';

const PRIMARY_SOFT = 'black';
const PRIMARY_DARK = '#4D2F82';
const WHITE = '#FFFFFF';
const GRAY_LIGHT = '#B1BCDA';
const TABLE_GRAY = '#F3F4FA';
const TEXT_COLOR = '#68779F';

export default makeStyles((theme) => ({
    chatWrapper: {
        height: '450px',
        width: '560px',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
    },

    container: {
        height: '450px',
        width: '600px',
        display: 'flex',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 30px 0 #B5BBC5',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
        position: 'fixed',
        right: '32px',
        bottom: '94px',
        zIndex: '99999',

        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100vh',
            bottom: 0,
            right: 0,
        },
    },
    emptyText: {
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4D2F82',
    },
    userContainer: {
        // width: '338px',
        width: '35%',
        // border: '1px solid red',
        borderRight: `1px solid ${GRAY_LIGHT}`,
        height: '100%',
        // boxShadow: '0px 3px 15px #4D2F821A',
        // borderRadius: '8px',
        background: '#FFF',
        // padding: '20px 15px',
        marginLeft: '12px',
        paddingRight: '12px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    userMainTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        '& h3': {
            margin: 0,
        },
    },
    formUserSearch: {
        marginBottom: '10px',
        display: 'flex',
        paddingTop: '9px',
        paddingBottom: '9px',
        // borderBottom: '1px solid red'
        // border: '1px solid red'
    },
    searchInput: {
        flex: 1,
        // border: '1px solid blue',
        width: '100%',
        marginRight: '10px !important',
        '&.container': {
            margin: 0,
            // border: '1px solid red'
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '2px 5px',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: '12px',
            opacity: 1,
            color: GRAY_LIGHT,
        },
    },
    searchButton: {
        // padding: '13px 23px',
        // minWidth: '60px',
        // width: '60px',
        // border: '1px solid green',
        background: PRIMARY_SOFT,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '12px',
        outline: 'none',
        '&.MuiButtonBase-root': {
            minWidth: '24px !important',
        },
        '&.MuiButtonBase-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
        },
    },
    overflowUser: {
        flex: 1,
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_SOFT,
            borderRadius: '10px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    userWrapper: {
        // borderTop: `0.5px solid ${GRAY_LIGHT}`,
        // padding: '10px 0',
    },
    userContent: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '15px 9px',
        cursor: 'pointer',
        '&.active': {
            backgroundColor: TABLE_GRAY,
        },
        '&:hover': {
            backgroundColor: TABLE_GRAY,
        },
    },
    userImage: {
        height: '26px',
        width: '26px',
        // height: '65px',
        // width: '65px',
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        borderRadius: '50%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '12px',
            color: WHITE,
        },
    },
    userText: {
        flex: 1,
    },
    userName: {
        padding: '0px !important',
        textTransform: 'capitalize',
        color: PRIMARY_DARK,
        // fontSize: '15px',
        fontSize: '12px',
        lineHeight: '18px',
        lineSpacing: '0px',
        // fontWeight: 'bold',
        // marginBottom: '11px',
        marginBottom: '6px',
    },
    userLastMessage: {
        padding: '0px',
        color: PRIMARY_DARK,
        fontSize: '13px',
        lineHeight: '16px',
        lineSpacing: '0px',
    },
    userBadge: {
        color: PRIMARY_DARK,
        fontSize: '10px',
        fontWeight: 'bold',
    },
    userInfo: {
        textAlign: 'center',
        width: '20px',
    },
    userDate: {
        padding: '0px',
        marginBottom: '19px',
    },
    customBadge: {
        '&.MuiBadge-root': {
            marginRight: '1px',
        },
    },
    chatPlugin: {
        position: 'fixed',
        right: theme.spacing(2),
        bottom: theme.spacing(10),
        zIndex: theme.zIndex.drawer + 3,
    },
    chatIcon: {
        fontSize: '20px',
    },
    messageContainer: {
        // marginLeft: '24px',
        // border: '1px solid blue',
        marginRight: '14px',
        flex: 1,
        // boxShadow: '0px 3px 15px #4D2F821A',
        // borderRadius: '8px',
        background: WHITE,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 0,
            height: '100%',
        },
    },
    selectedUser: {
        // cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '22px',
        marginBottom: '20px',
        borderBottom: '0.5px solid #9F9F9F',
    },
    userImageWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    userBackIcon: {
        cursor: 'pointer',
        marginRight: '12px',
    },
    selectedUserImage: {
        height: '28px',
        width: '28px',
        // height: '48px',
        // width: '48px',
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        borderRadius: '50%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '14px',
            // fontSize: '18px',
            color: WHITE,
        },
    },
    blockedUserContent: {
        height: '90%',
        padding: '0 2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBlockedUser: {
        height: '10%',
        paddingRight: '1em',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    messageContent: {
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_SOFT,
            borderRadius: '10px',
        },
        // [theme.breakpoints.down('md')]: {
        //     width: '100%',
        // },
    },
    messageImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    },
    fileImage: {
        minWidth: '100px',
    },
    messageLeftWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    messageLeftContent: {
        minWidth: '20%',
        maxWidth: '80%',
        marginBottom: '20px',
        // [theme.breakpoints.down('md')]: {
        //     maxWidth: '90%',
        // },
    },
    messageLeftText: {
        display: 'block',
        width: '100%',
        wordBreak: 'break-word',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '60px',
        fontSize: '12px',
        borderRadius: '0 20px 20px 20px',
        position: 'relative',
        margin: '0px',
        backgroundColor: TABLE_GRAY,
        '& span': {
            fontSize: '11px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: '16px',
            right: '20px',
        },
    },
    messageRightWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    messageRightText: {
        display: 'block',
        width: '100%',
        wordBreak: 'break-word',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '60px',
        fontSize: '12px',
        borderRadius: '20px 0 20px 20px',
        position: 'relative',
        margin: '0px',
        border: `1px solid ${GRAY_LIGHT}`,
        '& span': {
            fontSize: '11px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: '16px',
            right: '20px',
        },
    },
    messageCenterDate: {
        textAlign: 'center',
        fontSize: '13px',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        margin: 0,
        marginBottom: '22px',
    },
    formContent: {
        display: 'flex',
        alignItems: 'center',
    },
    uploadContainer: {
        marginRight: '8px',
        '& button': {
            borderRadius: '12px',
            minWidth: '25px',
        },
    },
    messageForm: {
        // marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },
    messageInput: {
        flex: 1,
        width: '100%',
        '&.container': {
            margin: 0,
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '2px 5px',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: '12px',
            opacity: 1,
            color: GRAY_LIGHT,
        },
    },
    messageButton: {
        marginLeft: '6px',
        fontSize: '14px',
        background: PRIMARY_SOFT,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '12px',
        outline: 'none',
        '&.MuiButtonBase-root': {
            minWidth: '24px !important',
        },
        '&.MuiButtonBase-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
        },
    },

    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
        },
    },
    btn: {
        borderRadius: 20,
        border: `1.5px solid ${PRIMARY_SOFT}`,
        backgroundColor: 'transparent',
        color: PRIMARY_SOFT,
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
        },
    },
    textNoFile: {
        color: TEXT_COLOR,
        padding: '0px 10px',
    },
    autoResponseWrapper: {
        maxWidth: '80%',
        marginBottom: '20px',
        fontSize: '12px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    },
    autoResponseTitle: {
        padding: '14px 20px',
        borderRadius: '0 20px 0 0',
        color: WHITE,
        backgroundColor: PRIMARY_SOFT,
        fontWeight: 'bold',
    },
    autoResponseBody: {
        borderRadius: '0 0 20px 20px',
        border: `1px solid ${GRAY_LIGHT}`,
        '& p': {
            margin: 0,
            padding: '14px 20px',
            cursor: 'pointer',
            color: TEXT_COLOR,
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
        '& p:hover': {
            backgroundColor: TABLE_GRAY,
        },
        '& p:last-child': {
            borderRadius: '0 0 20px 20px',
            borderBottom: 'none',
        },
    },
    botName: {
        fontSize: '10px',
        color: TEXT_COLOR,
    },
    customerName: {
        display: 'block',
        fontSize: '10px',
        color: TEXT_COLOR,
        textAlign: 'right',
    },
}));
