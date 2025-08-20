import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from "vite-plugin-commonjs";
import leafletDrawFix from "./vite.leaflet-draw.js";

export default defineConfig({
    plugins: [react(), commonjs(), leafletDrawFix()],
    base: "/apps/weather-dashboard",
    build: {
        outDir: "dist",
        minify: "esbuild",
        sourcemap: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom"],
                    "ui-vendor": ["antd", "@ant-design/icons"],
                    "map-vendor": ["leaflet", "leaflet-draw", "react-leaflet", "react-leaflet-draw"],
                    "chart-vendor": ["recharts", "chart.js"],
                },
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name]-[hash].js",
                assetFileNames: "assets/[ext]/[name]-[hash][extname]",
                externalLiveBindings: false,
            },
        },
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true,
        },
    },
    optimizeDeps: {
        include: [
            "react",
            "react-dom",
            "antd",
            "@ant-design/icons",
            "leaflet",
            "leaflet-draw",
            "react-leaflet",
            "react-leaflet-draw",
            "uuid",
        ],
    },
});
