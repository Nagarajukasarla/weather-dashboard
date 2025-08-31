import type { ContinuesData } from "@/types/component";

const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    115, 116, 117, 118, 119, 120,
];

// Upto 4 days is good
const getminArray = (temperatures: number[], days: number) => {
    let step = 24 / days;
    let start = 0;
    let end = step;
    const minTemperatures = [];
    for (let i = 0; i < days; i++) {
        const part = temperatures.slice(i * 24, (i + 1) * 24);
        const sortedPart = [...part].sort((a, b) => a - b);
        minTemperatures.push(...sortedPart.slice(start, end));
        start += step;
        end += step;
    }
    return minTemperatures;
};

console.log("getminArray(values, 3): ", getminArray(values, 3));

// More than 5 days is not recommended
const getDayWiseMinTemperature = (temperatures: number[]) => {
    const days = temperatures.length / 24;
    if (days >= 5) {
        let step = 24;
        const minTemperatures = [];
        for (let i = 0; i < days; i++) {
            const part = temperatures.slice(i * step, (i + 1) * step);
            minTemperatures.push(Math.min(...part));
        }
        return minTemperatures;
    }
};

console.log("getDayWiseMinTemperature(values): ", getDayWiseMinTemperature(values));

const getMinTemperatureArray = (temperatures: number[]) => {
    const len = temperatures.length;
    const days = len / 24;
    console.log("len: ", len);
    console.log("days: ", days);

    if (days === 1) {
        return temperatures;
    } else if (days >= 2 && days < 5) {
        return getminArray(temperatures, days);
    } else {
        return getDayWiseMinTemperature(temperatures);
    }
};

console.log("getMinTemperatureArray(values): ", getMinTemperatureArray(values));

const formatData = (step: number, data: number[]) => {
    let newData: { label: string; value: number }[] = [];
    let labelValue = 1;
    let currStep = step;

    let currShift = 24;
    for (let i = 0; i < data.length; i++) {
        const item = {
            label: String(labelValue++).padStart(2, "0") + ":00",
            value: data[i],
        };
        newData.push(item);
        if ((i + 1) % currStep == 0) {
            labelValue = currShift + 1;
            currShift += 24;
            currStep += step;
        }
    }
    return newData;
};

console.log(
    "formatData(12, num[]): " +
        JSON.stringify(
            formatData(8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]),
            null,
            2
        )
);