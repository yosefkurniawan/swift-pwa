import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        borderStyle: (props) => props.border_style || 'solid',
        backgroundPosition: (props) => props.background_position,
        backgroundColor: (props) => props.background_color || 'transparent',
        borderColor: (props) => props.border_color || 'transparent',
        borderWidth: (props) => `${props.border_top_width || 0}px ${props.border_right_width || 0}px ${props.border_bottom_width || 0}px ${
            props.border_left_width || 0
        }px` || '0 0 0 0',
        margin: (props) => `${props.margin_top || 0}px ${props.margin_right || 0}px ${props.margin_bottom || 0}px ${props.margin_left || 0
        }px ` || '0 0 0 0',
        padding: (props) => `${props.padding_top || 0}px ${props.padding_right || 0}px ${props.padding_bottom || 0}px ${props.padding_left || 0
        }px` || '0 0 0 0',
    },
    button: {
        backgroundPosition: (props) => props.background_position,
        boxShadow: (props) => `5px 10px ${props.box_shadow_color}`,
        borderStyle: (props) => props.button_border_style,
        borderWidth: (props) => props.button_border_width || 0,
        borderRadius: (props) => props.button_border_radius || 0,
        borderColor: (props) => props.button_border_color || 'transparent',
        backgroundColor: (props) => props.button_background_color || 'black',
        color: (props) => props.button_color || 'black',
    },
    mgzMessageBox: {
        '& > .magezone-icon .wrapperIcon': {
            fontSize: '1em',
            fontStyle: 'normal',
            fontWeight: 400,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '3.6em',
            marginLeft: 0,
            marginRight: 0,
        },
        '& > .magezone-icon .wrapperIcon i': {
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            lineHeight: 1,
            fontSize: (props) => props.icon_size,
        },
        '& > .magezone-icon .wrapperIcon, .magezone-icon .wrapperIcon i': {
            color: (props) => props.message_icon_color,
            backgroundColor: (props) => props.message_icon_background_color,
        },
    },
});

export default useStyles;
