import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
        port: 3002,
    },
    preview: {
        port: 3002,
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: 'global', replacement: 'globalThis' },
        ],
    },
    build: {
        sourcemap: false,
    },
    optimizeDeps: {
        include: ['quill-blot-formatter'],
    },
});
