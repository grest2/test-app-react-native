import actions, {SET_CRYPTO, SET_COUNTER, SET_WEATHER, SetCityNameAction} from "./actions";
import {WeatherTabState} from "../Utils/FetchWeather";
import {Currency} from "../Utils/FetchItems";
import {NavigationState} from "@react-navigation/routers";

type Action = {
    type: string,
    payload?: any
}

export type AppState = {
    counter: number;
    weatherState: WeatherTabState,
    cryptoState: CryptoTabState
}

export interface CryptoTabState {
    crypto: Array<Currency>;
}

const initWeatherState: WeatherTabState = {
    weather: {
        description: "test",
        wind: "",
        temperature: "",
        forecast: []
    },
    name: "Moscow"
}

const initCryptoState: CryptoTabState = {
    crypto: []
}

export const weatherTabReducer = (state: WeatherTabState = initWeatherState, action: Action) => {
    switch(action.type) {
        case SET_WEATHER: {
            console.log("_LOG_ Reducer has work")
            console.table(action.payload)
            return {
                ... state,
                weather: action.payload
            };
        }

        default:
            return state;
    }
}

const initialState: AppState = {
    cryptoState: initCryptoState,
    weatherState: initWeatherState,
    counter: 0,
};

export const cryptoTabReducer = (state: CryptoTabState = initCryptoState, action: Action): CryptoTabState => {
    switch (action.type) {
        case SET_CRYPTO: {
            console.log("_LOG_ Reducer for crypto has work");
            return {
                crypto: action.payload
            };
        }

        default:
           return state;
    }
}

export const counterReducer = (state: number = 0, action: Action): number => {
    console.log(state)
    switch (action.type) {
        case SET_COUNTER: {
            return state + action.payload
        }

        default:
            return state;
    }
}