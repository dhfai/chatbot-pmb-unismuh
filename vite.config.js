import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ini adalah konfigurasi Vite yang bersih dan standar
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    // Mempertahankan alias path '@' yang sudah Anda atur
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Anda bisa menyimpan ekstensi ini, ini adalah praktik yang baik
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
  },
  // Opsi server dan build yang spesifik untuk Hostinger telah dihapus.
  // Vite akan menggunakan pengaturan default yang sudah sangat baik.
});