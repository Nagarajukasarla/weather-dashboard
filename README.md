# Weather Dashboard

<div align="center">
  <img src="src/assets/screenshots/Mapview.png" alt="Weather Dashboard" width="800">
</div>

<br/>

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green.svg?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![Nivo Charts](https://img.shields.io/badge/Nivo-0.80.0-orange.svg?style=for-the-badge&logo=chartdotjs)](https://nivo.rocks/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12.0-pink.svg?style=for-the-badge&logo=apollographql)](https://recharts.org/)

</div>

## 🌦️ About The Project

A modern, interactive weather dashboard that provides real-time weather data visualization through interactive maps and detailed metrics. The application enables users to draw custom shapes on the map to analyze weather data for specific geographic areas, featuring an intuitive time slider for exploring historical weather patterns and trends.

## 🌍 Live Demo

Check out the live demo: [Weather Dashboard](https://weather-dashboard.nagarajukasarla.live)

## 📸 Screenshots

<div align="center">
  <img src="src/assets/screenshots/Mapview.png" alt="Map View" width="400" style="margin-right: 10px;">
  <img src="src/assets/screenshots/ChartsView.png" alt="Charts View" width="400">
  <img src="src/assets/screenshots/LineChartView.png" alt="Line Chart" width="400">
</div>

## 🚀 Features

-   **🌍 Interactive Map**

    -   Draw custom shapes to define specific geographic areas for weather analysis
    -   Pan and zoom to explore different regions with detailed map layers
    -   Get precise coordinates and elevation data for any location

-   **📊 Advanced Data Visualization**

    -   **Line Charts**: Track temperature, humidity, and other metrics over time
    -   **Pie Charts**: Visualize weather condition distributions and precipitation types
    -   **Bar Graphs**: Compare weather metrics across different time periods

-   **🔄 Real-time Data Integration**

    -   Live weather updates with configurable refresh intervals
    -   Historical weather data analysis with customizable date ranges
    -   Animated weather transitions and forecast predictions

-   **🎚️ Interactive Controls**
    -   Time sliders to explore historical weather patterns
    -   Toggle switches for different weather parameters

## 🛠️ Built With

-   [React](https://reactjs.org/) - Frontend library
-   [TypeScript](https://www.typescriptlang.org/) - Type safety
-   [Vite](https://vitejs.dev/) - Build tool and development server
-   [Redux](https://redux.js.org/) - State management
-   [Ant Design](https://ant.design/) - UI components
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Shadcn UI](https://ui.shadcn.com/) - UI components appearance
-   [Leaflet](https://leafletjs.com/) - Interactive maps
-   [Recharts](https://recharts.org/) - Data visualization
-   [Open-Meteo API](https://open-meteo.com/) - Weather data

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# Development & Production
VITE_WEATHER_API_BASE_URL=<weather_api_base_url>
VITE_DEBUG=true  # Set to false in production

# Production Only (Netlify Environment Variables)
SUPABASE_URL=<your_supabase_project_url>
```

### Supabase Configuration

The application uses Supabase for backend services. For production, you'll need to set up the following:

1. **Supabase Connection**: The application connects to Supabase using a connection string in production:

    ```javascript
    const pool = new Pool({
        connectionString: process.env.SUPABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
    ```

2. **Database Schema**:
    Create the following table in your Supabase database to store user analytics:

    ```sql
    CREATE TABLE IF NOT EXISTS public.user_analytics (
        id BIGSERIAL PRIMARY KEY,
        user_session_id TEXT NOT NULL,
        action TEXT NOT NULL,
        operation TEXT NOT NULL,
        ip TEXT,
        location JSONB,
        user_agent TEXT,
        created_date TIMESTAMPTZ DEFAULT NOW()
    );

    -- Add indexes for better query performance
    CREATE INDEX IF NOT EXISTS idx_user_analytics_user_session_id ON public.user_analytics(user_session_id);
    CREATE INDEX IF NOT EXISTS idx_user_analytics_created_date ON public.user_analytics(created_date);
    ```

    #### Table Structure

    | Column | Type | Description |
    |--------|------|-------------|
    | id | BIGSERIAL | Primary key, auto-incrementing |
    | user_session_id | TEXT | Unique identifier for the user session |
    | action | TEXT | The action performed by the user |
    | operation | TEXT | The type of operation performed |
    | ip | TEXT | User's IP address (if available) |
    | location | JSONB | Geographic location data (if available) |
    | user_agent | TEXT | User's browser/device information |
    | created_date | TIMESTAMPTZ | Timestamp when the record was created |

3. **Netlify Setup**: When deploying to Netlify:
    - Add the `SUPABASE_URL` to your Netlify environment variables
    - The connection will automatically use SSL in production

## 🚀 Getting Started

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

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
