import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        borderStyle: (props) => props.border_style || 'solid',
        backgroundPosition: (props) => props.background_position,
        justifyContent: ((props) => {
            let align = '';
            switch (props.content_align) {
            case 'left':
                align = 'flex-start'; break;
            case 'center':
                align = 'center'; break;
            case 'right':
                align = 'flex-end'; break;
            default:
                align = 'flex-start';
            }
            return align;
        }) || 'flex-start',
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
    },
});

export default useStyles;
