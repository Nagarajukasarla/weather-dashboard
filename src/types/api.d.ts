interface HourlyData {
    weather_code: number[];
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
} 

export interface OpenMeteoResponse {
    latitude: number;
    timezone: string;
    longitude: number;
    hourly: HourlyData;
}