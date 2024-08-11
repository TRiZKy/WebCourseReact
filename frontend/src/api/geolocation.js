/**
 * Gets the current geographic location of the user.
 *
 * @returns {Promise<{latitude: number, longitude: number}>} A promise that resolves to an object containing the latitude and longitude of the user's location.
 * @throws {Error} If geolocation is not supported by the browser or if there is an error retrieving the location.
 */
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
};
