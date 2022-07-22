// export const SET_CITY_NAME = 'SET_CITY_NAME';
//
// export const setCityName = name => ({
//         type: SET_CITY_NAME,
//         payload: name,
// })

import {Weather} from "../Utils/FetchWeather";
import {Currency} from "../Utils/FetchItems";

export const SET_WEATHER = 'SET_WEATHER';
export const SET_CRYPTO = 'SET_CRYPTO';

export interface SetCityNameAction {
    type: string;
    payload: string;
}

export const setWeather = (payload: Weather) => ({
    type: SET_WEATHER,
    payload: payload
});

export const setCrypto = (payload: Array<Currency>) => ({
    type: SET_CRYPTO,
    payload: payload
})


export default {
    setWeather,
    setCrypto
};