import {PaletteColorOptions} from '@mui/material';
import {createTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        table?: {
            selectedRow?: PaletteColorOptions;
            borderRow?: PaletteColorOptions;
        };
        border: PaletteColorOptions;
    }

    // add inside theme
    interface ThemeOptions {
    }
}

// extend typography inside the theme
declare module '@mui/material/styles/createTypography' {
    interface FontStyle {
        font1: string;
    }
}

export const darkTheme = createTheme({
    components: {
        MuiSelect: {
            defaultProps: {}
        },
        MuiInput: {
            defaultProps: {
                size: "small"
            }
        },
        MuiList: {
            defaultProps: {
                dense: true
            }
        },
        MuiTable: {
            defaultProps: {
                size: "small"
            }
        }
    },
    typography: {
        fontFamily: [
            'Helvetica Neue',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'dark',
        border: {
            main: '#252423'
        },
        primary: {
            main: '#c11817',
        },
        secondary: {
            main: '#90caf9',
        },
        table: {
            selectedRow: {
                main: '#292827'
            },
            borderRow: {
                main: '#252423'
            },
        },
        background: {
            default: "#1b1a19",
            paper: '#292929'
        }
    },
});

export const lightTheme = createTheme({
    // density
    components: {
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
    },
    typography: {
        fontFamily: [
            'Helvetica Neue',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#3fb63d',
            contrastText: 'rgba(255,255,255)'
        },
        border: {
            main: '#565554'
        },
        secondary: {
            main: '#515B3A',
        },
        table: {
            selectedRow: {
                main: '#f3f2f1'
            },
            borderRow: {
                main: '#f3f3f3'
            },
        },
    },
});

