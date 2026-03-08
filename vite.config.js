import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-fallback',
      apply: 'build',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        const indexPath = resolve(distDir, 'index.html');
        const fallbackPath = resolve(distDir, '404.html');

        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath);
          console.log('✅ SPA Fallback: Created dist/404.html successfully');
        } else {
          console.warn('⚠️ Warning: index.html not found in dist folder!');
        }
      },
    },
  ],
});
