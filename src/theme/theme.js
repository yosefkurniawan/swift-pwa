import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import {
    GRAY_SECONDARY, PRIMARY, SECONDARY, WHITE,
} from './colors';
import { FONT_24, FONT_DEFAULT, FONT_REGULAR } from './typography';

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
            main: red.A400,
        },
        background: {
            default: WHITE,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1200,
            xl: 1920,
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
                ...FONT_DEFAULT,
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
                'text-transform': 'capitalize',
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
