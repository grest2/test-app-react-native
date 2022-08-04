import actions, {SET_CRYPTO, SET_COUNTER, SET_WEATHER, SetCityNameAction, SET_USER} from "./actions";
import {WeatherTabState} from "../screens/Views/FetchWeather";
import {Currency} from "../screens/Views/FetchItems";
import {NavigationState} from "@react-navigation/routers";
import {User} from "../screens/Views/LoginView";

type Action = {
    type: string,
    payload?: any
}

export type AppState = {
    counter: number;
    weatherState: WeatherTabState,
    cryptoState: CryptoTabState,
    userState: UserState
}

export interface CryptoTabState {
    crypto: Array<Currency>;
}

export interface UserState {
    user: User
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

const initUserState: UserState = {
    user: {
        id: 0,
        email: "",
        lastName: "",
    }
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
    userState: initUserState,
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

export const userReducer = (state: UserState = initUserState, action: Action): UserState => {
    switch (action.type) {
        case SET_USER: {
            console.log("_LOG_ user reducer has work")

            return {
                user: action.payload
            };
        }

        default:
            return state;
    }
}