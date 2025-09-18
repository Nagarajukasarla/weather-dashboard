import { describe, test, expect, vi, afterEach, beforeEach } from "vitest";
import { fetchWeather, fetchTemperature } from "../api/weather";
import APIResponse from "../classes/APIResponse";
import type { LatLngLiteral } from "leaflet";

// Mock the global fetch function
function mockFetch(response: any, ok = true) {
    // Clear any existing mocks to ensure a clean state
    vi.restoreAllMocks();

    // Create a mock implementation for the fetch response
    const mockJson = vi.fn().mockResolvedValue(response);
    
    // Mock the fetch function to return a resolved promise with our test data
    const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
            ok,                     // Simulate success/failure
            status: ok ? 200 : 404, // Set appropriate status code
            json: mockJson,         // Attach our mock JSON function
        })
    );

    // Replace the global fetch with our mock
    global.fetch = mockFetch as unknown as typeof global.fetch;

    return { mockFetch, mockJson };
}

// Store the original console.error to restore it later
const originalConsoleError = console.error;

// Suppress error logs during tests to keep the output clean
beforeEach(() => {
    // Mock console.error to suppress error messages
    console.error = vi.fn();
});

// Restore the original console.error after all tests
afterEach(() => {
    // Restore the original console.error
    console.error = originalConsoleError;
    // Restore all mocks after each test
    vi.restoreAllMocks();
});

describe("Weather API Tests", () => {
    const mockCoords: LatLngLiteral = { lat: 17.385, lng: 78.4867 }; // Hyderabad, India coordinates
    const mockDateRange: [string, string] = ["2025-09-18", "2025-09-24"];

    // No need for afterEach here anymore as it's moved to the top level
    // to handle all test cases

    describe("fetchWeather", () => {
        const mockWeatherResponse = {
            latitude: mockCoords.lat,
            longitude: mockCoords.lng,
            timezone: "Asia/Kolkata",
            hourly: {
                time: ["2025-18-09T00:00", "2025-18-09T23:59"],
                temperature_2m: [5.2, 5.1],
                precipitation: [0, 0.1],
                relative_humidity_2m: [85, 86],
                wind_speed_10m: [10.2, 10.5],
                weather_code: [1, 2],
            },
        };

        test("should return weather data on successful API call", async () => {
            // Arrange
            mockFetch(mockWeatherResponse);

            // Act
            const result = await fetchWeather(mockCoords, mockDateRange);

            // Assert
            expect(result.code).toBe(APIResponse.SUCCESS);
            expect(result.data).toEqual({
                latitude: mockCoords.lat,
                longitude: mockCoords.lng,
                timezone: "Asia/Kolkata",
                hourly: mockWeatherResponse.hourly,
            });
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`latitude=${mockCoords.lat}&longitude=${mockCoords.lng}`)
            );
        });

        test("should handle API error responses", async () => {
            // Arrange
            mockFetch({ error: "Not found" }, false);

            // Act
            const result = await fetchWeather(mockCoords, mockDateRange);

            // Assert
            expect(result.code).toBe(APIResponse.NOT_FOUND);
            expect(result.data).toBeNull();
        });

        test("should handle network errors", async () => {
            // Arrange
            // Create a mock that rejects with a network error
            const error = new Error("Network error");
            global.fetch = vi.fn().mockRejectedValue(error);

            // Act
            const result = await fetchWeather(mockCoords, mockDateRange);

            // Assert
            expect(result.code).toBe(APIResponse.NETWORK_ERROR);
            expect(result.data).toBeNull();
            
            // Verify the fetch was called with the correct parameters
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`latitude=${mockCoords.lat}&longitude=${mockCoords.lng}`)
            );
        });
    });

    describe("fetchTemperature", () => {
        const mockTemperatureResponse = {
            current: {
                temperature_2m: 22.5,
            },
        };

        test("should return temperature data on successful API call", async () => {
            // Arrange
            mockFetch(mockTemperatureResponse);

            // Act
            const result = await fetchTemperature(mockCoords);

            // Assert
            expect(result.code).toBe(APIResponse.SUCCESS);
            expect(result.data).toBe(22.5);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`latitude=${mockCoords.lat}&longitude=${mockCoords.lng}`)
            );
        });

        test("should handle missing temperature data", async () => {
            // Arrange
            mockFetch({ current: {} });

            // Act
            const result = await fetchTemperature(mockCoords);

            // Assert
            expect(result.code).toBe(APIResponse.NOT_FOUND);
            expect(result.data).toBeNull();
        });

        test("should handle API error responses", async () => {
            // Arrange
            mockFetch({ error: "Not found" }, false);

            // Act
            const result = await fetchTemperature(mockCoords);

            // Assert
            expect(result.code).toBe(APIResponse.NOT_FOUND);
            expect(result.data).toBeNull();
        });

        test("should handle network errors", async () => {
            // Arrange
            // Create a mock that rejects with a network error
            const error = new Error("Network error");
            global.fetch = vi.fn().mockRejectedValue(error);

            // Act
            const result = await fetchTemperature(mockCoords);

            // Assert
            expect(result.code).toBe(APIResponse.NETWORK_ERROR);
            expect(result.data).toBeNull();
            
            // Verify the fetch was called with the correct parameters
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`latitude=${mockCoords.lat}&longitude=${mockCoords.lng}`)
            );
        });
    });
});
