import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default function leafletDrawFix() {
  return {
    name: 'leaflet-draw-fix',
    config: () => ({
      optimizeDeps: {
        include: ['leaflet-draw'],
        exclude: ['react-leaflet-draw']
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true
        }
      }
    }),
    resolveId(source) {
      if (source === 'leaflet-draw') {
        return { id: require.resolve('leaflet-draw'), external: false };
      }
      return null;
    }
  };
}
