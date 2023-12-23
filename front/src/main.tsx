import { ThemeProvider } from '@emotion/react'
import { Close } from '@mui/icons-material'
import { CssBaseline, IconButton } from '@mui/material'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { setupStore } from './app/store.ts'
import { App } from './App.tsx'
import theme from './config/theme'

import './main.css'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={5}
                    action={(snackbarId) => (
                        <IconButton color="inherit" onClick={() => closeSnackbar(snackbarId)}>
                            <Close />
                        </IconButton>
                    )}
                    preventDuplicate
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>,
)
