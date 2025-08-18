// Type definitions for leaflet-draw
// These declarations help TypeScript understand the leaflet-draw module

declare module 'leaflet-draw' {
  import * as L from 'leaflet';

  namespace L {
    namespace Draw {
      interface DrawOptions {
        position?: string;
        draw?: any;
        edit?: any;
      }

      class Draw extends L.Class {
        constructor(map: L.Map, options?: DrawOptions);
        initialize(map: L.Map, options?: DrawOptions): void;
        setDrawingOptions(options: any): void;
      }

      class DrawMap extends L.Class {
        static Toolbar: any;
        static Tooltip: any;
        static Local: any;
        static version: string;
      }
    }
  }

  export = L.Draw;
}
