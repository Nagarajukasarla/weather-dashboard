import type { HourlyData, OpenMeteoResponse } from "../types/api";
import type { ContinuesData } from "../types/component";

export type WeatherCategoryType = "Sunny" | "Cloudy" | "Rainy" | "Stormy" | "Snowy";

export type WeatherCategory = {
    type: WeatherCategoryType;
    value: number;
};

export interface DashboardData {
    minTemperature: string;
    maxTemperature: string;
    minHumidity: string;
    maxHumidity: string;
    minWindSpeed: string;
    maxWindSpeed: string;
    minPrecipitation: string;
    maxPrecipitation: string;
    weatherCategory: WeatherCategory[];
    weatherTimeline: ContinuesData[];
}

/**
 * Transforms the given weather response into a DashboardData object.
 * If the weather response is null, null is returned.
 * @param {OpenMeteoResponse | null} weatherResponse the weather response to transform
 * @returns {DashboardData | null} the transformed DashboardData object, or null if the weather response is null
 */
export const getTransformedWeatherData = (weatherResponse: OpenMeteoResponse | null): DashboardData | null => {
    if (!weatherResponse) {
        return null;
    }
    const { hourly } = weatherResponse;
    const { temperature_2m, precipitation, relative_humidity_2m, wind_speed_10m, weather_code } = hourly;
    const minTemperature = Math.min(...temperature_2m);
    const maxTemperature = Math.max(...temperature_2m);
    const minHumidity = Math.min(...relative_humidity_2m);
    const maxHumidity = Math.max(...relative_humidity_2m);
    const minWindSpeed = Math.min(...wind_speed_10m);
    const maxWindSpeed = Math.max(...wind_speed_10m);
    const minPrecipitation = Math.min(...precipitation);
    const maxPrecipitation = Math.max(...precipitation);
    const weatherCategory = getWeatherCategoryPercentages(weather_code);
    const weatherTimeline = getWeatherTimeLine(weatherResponse.hourly.time, weatherResponse.hourly);

    const dashboardData: DashboardData = {
        minTemperature: minTemperature.toString(),
        maxTemperature: maxTemperature.toString(),
        minHumidity: minHumidity.toString(),
        maxHumidity: maxHumidity.toString(),
        minWindSpeed: minWindSpeed.toString(),
        maxWindSpeed: maxWindSpeed.toString(),
        minPrecipitation: minPrecipitation.toString(),
        maxPrecipitation: maxPrecipitation.toString(),
        weatherCategory: weatherCategory,
        weatherTimeline: weatherTimeline,
    };
    return dashboardData;
};

/**
 * Returns an array of ContinuesData objects representing the weather data at each hour in the given weather response.
 * @param {string[]} dates the dates at which the weather data is recorded
 * @param {HourlyData} hourlyData the hourly data from the weather response
 * @returns {ContinuesData[]} an array of ContinuesData objects representing the weather data at each hour
 */
const getWeatherTimeLine = (dates: string[], hourlyData: HourlyData): ContinuesData[] => {
    const result: ContinuesData[] = [];
    if (
        dates &&
        dates.length > 0 &&
        hourlyData.relative_humidity_2m &&
        hourlyData.relative_humidity_2m.length > 0 &&
        hourlyData.temperature_2m &&
        hourlyData.temperature_2m.length > 0
    ) {
        dates.forEach((date, idx) => {
            result.push({
                dateLabel: date,
                temperature: Number(hourlyData.temperature_2m[idx].toFixed(1)),
                feelsLike: Number((((Math.random() * 2) % 3) + hourlyData.temperature_2m[idx]).toFixed(1)),
                humidity: Number(hourlyData.relative_humidity_2m[idx].toFixed(1)),
            });
        });
    }
    return result;
};

/**
 * Returns the step size for the hourly temperature array based on the given time difference in days.
 * If the difference is less than 5 days, the step size will be 24 / difference, otherwise it will be 1.
 * @param {number} diff time difference in days
 * @returns {number} step size
 */
export const getHourlyStep = (diff: number): number => {
    if (diff < 5) {
        return 24 / diff;
    } else {
        return 1;
    }
};

/**
 * Calculates the percentage of each weather category in the given weather codes array.
 * @param {number[]} weatherCodes array of weather codes
 * @returns {WeatherCategory[]} an array of objects with type and value properties, where type is the weather category and value is the percentage of that category
 */
const getWeatherCategoryPercentages = (weatherCodes: number[]): WeatherCategory[] => {
    const categoryMap: Record<WeatherCategoryType, number[]> = {
        Sunny: [0, 1, 2],
        Cloudy: [3, 45, 48],
        Rainy: [51, 53, 55, 61, 63, 65, 80, 81, 82],
        Stormy: [95, 96, 99],
        Snowy: [71, 73, 75, 77],
    };

    // Initialize category counters
    const counts: Record<WeatherCategoryType, number> = {
        Sunny: 0,
        Cloudy: 0,
        Rainy: 0,
        Stormy: 0,
        Snowy: 0,
    };

    weatherCodes.forEach(code => {
        (Object.keys(categoryMap) as WeatherCategoryType[]).forEach(category => {
            if (categoryMap[category].includes(code)) {
                counts[category]++;
            }
        });
    });

    const total = weatherCodes.length;

    return (Object.keys(counts) as WeatherCategoryType[]).map(category => ({
        type: category,
        value: parseFloat(((counts[category] / total) * 100).toFixed(1)),
    }));
};

/**
 * Returns a chart data array with the average temperature for each day in the given dateWithTemperatures array.
 * @param {Record<string, number>[]} dateWithTemperatures array of objects with date and temperature properties
 * @returns {ChartData[]} @param ChartData[] data array
 */
export const getDayWiseAverageData = (weatherTimeline: ContinuesData[]): ContinuesData[] => {
    const result: ContinuesData[] = [];
    const len = weatherTimeline.length;
    let currentTemperatureSum = 0;
    let currentHumiditySum = 0;
    let currentFeelsLikeSum = 0;
    let dayCount = 1;

    for (let i = 0; i < len; i++) {
        // Get the temperature value from the object (there's only one key-value pair per object)
        const temperature = weatherTimeline[i].temperature;
        const humidity = weatherTimeline[i].humidity!!;
        const feelsLike = weatherTimeline[i].feelsLike!!;

        currentTemperatureSum += temperature;
        currentHumiditySum += humidity;
        currentFeelsLikeSum += feelsLike;

        // Every 24 hours, calculate the average for the day
        if ((i + 1) % 24 === 0) {
            result.push({
                dateLabel: `D-${dayCount}`,
                temperature: parseFloat((currentTemperatureSum / 24).toFixed(1)),
                feelsLike: parseFloat((currentFeelsLikeSum / 24).toFixed(1)),
                humidity: parseFloat((currentHumiditySum / 24).toFixed(1)),
            });
            currentTemperatureSum = 0;
            currentFeelsLikeSum = 0;
            currentHumiditySum = 0;
            dayCount++;
        }
    }

    return result;
};

/**
 * Returns a chart data array with the temperatures for the given date and dateWithTemperatures array.
 * @param {string} date date string
 * @param {Record<string, number>[]} dateWithTemperatures array of objects with date and temperature properties
 * @returns {ChartData[]} chart data array
 */
export const getHourlyData = (date: string, weatherTimeline: ContinuesData[]): ContinuesData[] => {
    const dayFirstHour = weatherTimeline.findIndex(item => date.includes(item.dateLabel.split("T")[0]));

    let result: ContinuesData[] = [];
    let currentHour = 1;
    for (let i = dayFirstHour; currentHour <= 24; currentHour++, i++) {
        result.push({
            dateLabel: String(currentHour).padStart(2, "0"),
            temperature: weatherTimeline[i].temperature,
            feelsLike: weatherTimeline[i].feelsLike,
            humidity: weatherTimeline[i].humidity,
        });
    }
    return result;
};

export const getNivoLineChartData = (data: ContinuesData[]) => {
    const temperatures: { x: string | number; y: number }[] = [];
    const humidities: { x: string | number; y: number }[] = [];
    const feelsLikes: { x: string | number; y: number }[] = [];

    data.forEach(value => {
        temperatures.push({ x: value["dateLabel"], y: value["temperature"] ?? 0 });
        humidities.push({ x: value["dateLabel"], y: value["humidity"] ?? 0 });
        feelsLikes.push({ x: value["dateLabel"], y: value["feelsLike"] ?? 0 });
    });

    return [
        {
            id: "temperature",
            color: "#ff7300",
            data: temperatures,
        },
        {
            id: "humidity",
            color: "#00c2ff",
            data: humidities,
        },
        {
            id: "feelsLike",
            color: "#ffb347",
            data: feelsLikes,
        },
    ];
};
