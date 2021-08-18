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
    button: (props) => ({
        transition: 'all 0.2s ease-in-out',
        backgroundPosition: props.background_position,
        color: props.button_color || 'black',
        boxShadow: `5px 10px ${props.box_shadow_color}`,
        borderStyle: props.button_border_style,
        borderWidth: `${props.button_border_width}px` || 0,
        borderRadius: `${props.button_border_radius}px` || 0,
        borderColor: props.button_border_color || 'transparent',
        backgroundColor: props.button_background_color || 'black',
        ...(props.full_width && { width: '100%' }),
        ...((props.gradient_color_1 || props.gradient_color_2) && {
            backgroundImage: `
                linear-gradient(to right, ${props.gradient_color_1} 0, ${props.gradient_color_2} 50%, ${props.gradient_color_1} 100%)
            `,
            backgroundSize: '200% 100%',
        }),
        '&:hover': {
            ...((props.button_hover_color || props.button_hover_border_color || props.button_hover_background_color) && {
                color: props.button_hover_color,
                borderColor: props.button_hover_border_color,
                backgroundColor: props.button_hover_background_color,
            }),
            ...((props.gradient_color_1 || props.gradient_color_2) && {
                backgroundPosition: '100% 0',
            }),
        },
    }),
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
    wrapper: {
        '&.xs-hide': {
            '@media (max-width: 575px)': {
                display: 'none !important',
            },
        },
        '&.sm-hide': {
            '@media (min-width: 576px) and (max-width: 767px)': {
                display: 'none !important',
            },
        },
        '&.md-hide': {
            '@media (min-width: 768px) and (max-width: 991px)': {
                display: 'none !important',
            },
        },
        '&.lg-hide': {
            '@media (min-width: 992px) and (max-width: 1200px)': {
                display: 'none !important',
            },
        },
        '&.xl-hide': {
            '@media (min-width: 1200px)': {
                display: 'none !important',
            },
        },
    },
});

export default useStyles;
