
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This ensures that the server redirects all requests to index.html
    // allowing React Router to handle the routing client-side
    historyApiFallback: true,
  },
});