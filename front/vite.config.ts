import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), i18n() as any, EnvironmentPlugin('all')],
    build: {
        rollupOptions: { output: { manualChunks: undefined } },
        chunkSizeWarningLimit: 350000,
    },
    optimizeDeps: {
        include: ['@mui/material/Tooltip'],
    },
})

function i18n() {
    return {
        name: 'i18n',
        enforce: 'post',
        // HMR
        handleHotUpdate({ file, server }) {
            if (file.endsWith('.json')) {
                console.log('reloading json file...')

                server.ws.send({
                    type: 'full-reload',
                    path: '*',
                })
            }
        },
    }
}
