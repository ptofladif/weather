const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=949597b7476becdad796ddc658a139f2';

    request ( { url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
            callback(undefined, 
                body.current.weather[0].main + '<br>' +
                body.current.weather[0].description + '<br>' +
                (body.current.temp - 273.15).toFixed(1) + 'C'
            )
        }
    });
}

module.exports = forecast;