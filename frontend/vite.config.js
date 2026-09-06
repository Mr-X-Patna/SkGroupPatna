import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: true,   // Disable HTTPS for local dev
    port: 3000,
    open: true,
  },
});
