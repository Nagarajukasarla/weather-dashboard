// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     build: {
//         outDir: 'dist',
//         minify: 'esbuild',
//         sourcemap: true,
//         // Add any additional build options here
//         chunkSizeWarningLimit: 1000,
//     },
//     // Add any additional configurations here
//     optimizeDeps: {
//         include: [
//             'react',
//             'react-dom',
//             'antd',
//             '@ant-design/icons',
//             'leaflet',
//             'react-leaflet',
//             'react-leaflet-draw',
//             'leaflet-draw',
//             'uuid',
//             'open-meteo',
//             'axios',
//         ],
//     },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        externalLiveBindings: false,
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'antd',
      '@ant-design/icons',
      'leaflet',
      'leaflet-draw',
      'react-leaflet',
      'react-leaflet-draw',
      'uuid',
    ],
  },
});
