/* eslint-disable object-curly-newline */
import { createMuiTheme } from '@material-ui/core/styles';
import {
    GRAY_SECONDARY, PRIMARY, SECONDARY, BACKGROUND_COLOR, ERROR_COLOR,
} from '@theme_color';
import { FONT_24, FONT_DEFAULT, FONT_HEADING, FONT_REGULAR } from '@theme_typography';
import { BREAKPOINTS } from '@theme_vars';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY,
        },
        secondary: {
            main: SECONDARY,
        },
        error: {
            main: ERROR_COLOR,
        },
        background: {
            default: BACKGROUND_COLOR,
        },
    },
    breakpoints: {
        values: {
            ...BREAKPOINTS,
        },
    },
    overrides: {
        MuiGrid: {
            root: {
                padding: 0,
                margin: 0,
            },
        },
        MuiTextField: {
            root: {
                ...FONT_REGULAR,
            },
        },
        MuiTypography: {
            h1: {
                ...FONT_24,
                ...FONT_HEADING,
            },
            h2: {
                ...FONT_HEADING,
            },
            h3: {
                ...FONT_HEADING,
            },
            h4: {
                ...FONT_HEADING,
            },
            h5: {
                ...FONT_HEADING,
            },
            h6: {
                ...FONT_HEADING,
            },
            root: {
                ...FONT_DEFAULT,
            },
        },
        MuiRadio: {
            root: {
                color: GRAY_SECONDARY,
                '&$checked': {
                    color: PRIMARY,
                },
            },
        },
        MuiFormControlLabel: {
            label: {
                ...FONT_REGULAR,
            },
            root: {
                marginBottom: -15,
            },
        },
        MuiDrawer: {
            paperAnchorRight: {
                background: 'transparent',
                boxShadow: 'none',
            },
        },
        MuiIcon: {
            root: {
                color: PRIMARY,
            },
        },
        MuiButton: {
            root: {
                borderRadius: 100,
            },
        },
    },
});

export default theme;
