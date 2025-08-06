
A modern, interactive weather dashboard built with React, TypeScript, and Vite. Visualize weather data with interactive maps and charts.

## Features

- Interactive map with shape drawing tools
- Real-time weather data visualization
- Temperature, humidity, wind speed, and precipitation metrics
- Responsive design with a modern UI
- Data persistence using localStorage
- Interactive charts for weather trends

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and builds
- Redux for state management
- Ant Design for UI components
- Leaflet and React-Leaflet for maps
- Recharts for data visualization
- Open-Meteo API for weather data

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Nagarajukasarla/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/` - Source code
  - `components/` - Reusable React components
    - `core/` - Core UI components
    - `feature/` - Feature-specific components
    - `layouts/` - Page layouts
  - `state/` - Redux store and slices
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `api/` - API integration

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `test` - Run tests
- `lint` - Run ESLint
- `typecheck` - Run TypeScript type checking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
