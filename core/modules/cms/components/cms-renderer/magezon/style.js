import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        backgroundPosition: (props) => props.background_position,
        alignContent: (props) => props.content_align,
    },
    button: {
        backgroundPosition: (props) => props.background_position,
        boxShadow: (props) => `5px 10px ${props.box_shadow_color}`,
        borderStyle: (props) => props.button_border_style,
        borderRadius: (props) => props.button_border_width || 0,
    },
});

export default useStyles;
