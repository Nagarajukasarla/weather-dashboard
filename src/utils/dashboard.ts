import type { OpenMeteoResponse } from "../types/api";

export interface DashboardData {
    minTemperature: string;
    maxTemperature: string;
    minHumidity: string;
    maxHumidity: string;
    minWindSpeed: string;
    maxWindSpeed: string;
    minPrecipitation: string;
    maxPrecipitation: string;
    minTemperatures: number[] | undefined;
    maxTemperatures: number[] | undefined;
}

export const getTransformedWeatherData = (weatherResponse: OpenMeteoResponse | null): DashboardData | null => {
    if (!weatherResponse) {
        return null;
    }
    const { hourly } = weatherResponse;
    const { temperature_2m, precipitation, relative_humidity_2m, wind_speed_10m } = hourly;
    const minTemperature = Math.min(...temperature_2m) + "°C";
    const maxTemperature = Math.max(...temperature_2m) + "°C";
    const minHumidity = Math.min(...relative_humidity_2m) + "%";
    const maxHumidity = Math.max(...relative_humidity_2m) + "%";
    const minWindSpeed = Math.min(...wind_speed_10m) + "m/s";
    const maxWindSpeed = Math.max(...wind_speed_10m) + "m/s";
    const minPrecipitation = Math.min(...precipitation) + "mm";
    const maxPrecipitation = Math.max(...precipitation) + "mm";
    const minTemperatures = getMinTemperatureArray(temperature_2m);
    const maxTemperatures = getMaxTemperatureArray(temperature_2m);

    const dashboardData: DashboardData = {
        minTemperature: minTemperature.toString(),
        maxTemperature: maxTemperature.toString(),
        minHumidity: minHumidity.toString(),
        maxHumidity: maxHumidity.toString(),
        minWindSpeed: minWindSpeed.toString(),
        maxWindSpeed: maxWindSpeed.toString(),
        minPrecipitation: minPrecipitation.toString(),
        maxPrecipitation: maxPrecipitation.toString(),
        minTemperatures: minTemperatures && minTemperatures.length > 0 ? minTemperatures : [],
        maxTemperatures: maxTemperatures && maxTemperatures.length > 0 ? maxTemperatures : [],
    };

    console.log("===dashboardData", dashboardData);
    return dashboardData;
}


const getminArray = (temperatures: number[], days: number): number[] => {
    if (temperatures.length === 0 || days === 0) {
        return [];
    }
    let step = 24 / days;
    let start = 0;
    let end = step;
    const minTemperatures: number[] = [];
    for (let i = 0; i < days; i++) {
        const part = temperatures.slice(i * 24, (i + 1) * 24);
        const sortedPart = [...part].sort((a, b) => a - b);
        minTemperatures.push(...sortedPart.slice(start, end));
        start += step;
        end += step;
    }
    return minTemperatures;
}

const getmaxArray = (temperatures: number[], days: number): number[] => {
    if (temperatures.length === 0 || days === 0) {
        return [];
    }
    let step = 24 / days;
    let start = 0;
    let end = step;
    const maxTemperatures: number[] = [];
    for (let i = 0; i < days; i++) {
        const part = temperatures.slice(i * 24, (i + 1) * 24);
        const sortedPart = [...part].sort((a, b) => b - a);
        maxTemperatures.push(...sortedPart.slice(start, end));
        start += step;
        end += step;
    }
    return maxTemperatures;
}

const getMinTemperatureArray = (temperatures: number[]) => {
    const days = temperatures.length / 24;

    if (days === 1) {
        return temperatures;
    }
    else if (days >= 2 && days < 5) {
        return getminArray(temperatures, days);
    }
    else {
        return getDayWiseMinTemperature(temperatures);
    }
}

const getMaxTemperatureArray = (temperatures: number[]) => {
    const days = temperatures.length / 24;

    if (days === 1) {
        return temperatures;
    }
    else if (days >= 2 && days < 5) {
        return getmaxArray(temperatures, days);
    }
    else {
        return getDayWiseMaxTemperature(temperatures);
    }
}

const getDayWiseMinTemperature = (temperatures: number[]) => {
    const days = temperatures.length / 24;
    if (days > 5) {
        let step = 24;
        const minTemperatures = [];
        for (let i = 0; i < days; i++) {
            const part = temperatures.slice(i * step, (i + 1) * step);
            minTemperatures.push(Math.min(...part));
        }
        return minTemperatures;
    }
}

const getDayWiseMaxTemperature = (temperatures: number[]) => {
    const days = temperatures.length / 24;
    if (days > 5) {
        let step = 24;
        const maxTemperatures = [];
        for (let i = 0; i < days; i++) {
            const part = temperatures.slice(i * step, (i + 1) * step);
            maxTemperatures.push(Math.max(...part));
        }
        return maxTemperatures;
    }
}

