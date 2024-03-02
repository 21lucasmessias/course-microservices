import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0c120c',
        },
        secondary: {
            main: '#c20114',
        },
        success: {
            main: '#00A859',
        },
        error: {
            main: '#6d7275',
        },
        text: {
            primary: '#0c120c',
        },
        background: {
            default: '#c7d6d5',
            paper: '#c7d6d5',
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                sx: {
                    backgroundColor: '#c7d6d5',
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                sx: {
                    backgroundColor: '#c7d6d5',
                },
            },
        },
    },
})

export default theme
