import axios from 'axios';

const API_KEY = '4ff4bcb3d1b47dc86e2c628ddc95b27e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${ API_KEY }`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ ROOT_URL }&q=${ city },us`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
