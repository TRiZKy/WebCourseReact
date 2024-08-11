/**
 * Fetches the current weather data for a given geographic location.
 *
 * @param {number} latitude - The latitude of the location to fetch weather data for.
 * @param {number} longitude - The longitude of the location to fetch weather data for.
 * @returns {Promise<Object>} A promise that resolves to the weather data object.
 * @throws {Error} If the request to the weather API fails.
 */
export const fetchWeatherData = async (latitude, longitude) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=981f92af40ac4f31883191916240907&q=${latitude},${longitude}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
}
