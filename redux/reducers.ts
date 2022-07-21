import {SET_WEATHER, SetCityNameAction} from "./actions";
import {WeatherTabState} from "../Utils/FetchWeather";

type Action = {
    type: string,
    payload?: any
}

export type AppState = {
    weatherState: WeatherTabState,
}


const initialState: WeatherTabState = {
    weather: {
        description: "",
        wind: "",
        temperature: "",
        forecast: []
    },
    name: "Moscow"
}

const weatherTabReducer = (state: WeatherTabState = initialState, action: Action) => {
    switch(action.type) {
        case SET_WEATHER: {
            console.log("_LOG_ Reducer has work")
            return {
                ... state,
                weather: action.payload
            };
        }

        default:
            return state;
    }
}
export default weatherTabReducer;