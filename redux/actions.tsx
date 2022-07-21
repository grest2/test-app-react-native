// export const SET_CITY_NAME = 'SET_CITY_NAME';
//
// export const setCityName = name => ({
//         type: SET_CITY_NAME,
//         payload: name,
// })

import {Weather} from "../Utils/FetchWeather";

export const SET_WEATHER = 'SET_WEATHER';

export interface SetCityNameAction {
    type: string;
    payload: string;
}

export const setWeather = (payload: Weather) => ({
    type: SET_WEATHER,
    payload: payload
});

export default {
    setWeather,
};