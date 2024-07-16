
export const fetchWeatherData = async (latitude, longitude) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=981f92af40ac4f31883191916240907&q=${latitude},${longitude}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
}
