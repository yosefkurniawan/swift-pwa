import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { GRAY_PRIMARY, PRIMARY, SECONDARY, WHITE, GRAY_SECONDARY } from './colors'
import { FONT_24, FONT_DEFAULT, FONT_REGULER } from "./typography";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY,
        },
        secondary: {
            main: SECONDARY
        },
        error: {
            main: red.A400
        },
        background: {
            default: WHITE
        }
    },
    overrides : {
        MuiGrid : {
            root : {
                padding : 0,
                margin : 0
            }
        },
        MuiTextField : {
            root : {
                ...FONT_REGULER
            },
        },
        MuiTypography : {
            h1 : {
                ...FONT_24,
                ...FONT_DEFAULT
            },
            root : {
                ...FONT_DEFAULT
            }
        },
        MuiRadio : {
            root :{
                color : GRAY_SECONDARY,
                '&$checked' : {
                    color : PRIMARY
                },
            },
        },
        MuiFormControlLabel : {
            label : {
                ...FONT_REGULER,
                'text-transform' : 'capitalize'
            }
        }
    },
    props: {
        MuiTypography: {
          variantMapping: {
            h1: 'h1',
            h2: 'h3',
            h3: 'h3',
            h4: 'h3',
            h5: 'h3',
            h6: 'h3',
            subtitle1: 'h3',
            subtitle2: 'h3',
            body1: 'span',
            body2: 'span',
          },
        }
      },
});

export default theme;
