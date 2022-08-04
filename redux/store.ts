import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {counterReducer, cryptoTabReducer, weatherTabReducer} from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {createNavigationReducer} from "react-navigation-redux-helpers";
import {Tab} from "../App";

const rootReducer = combineReducers({
    weatherState: weatherTabReducer,
    cryptoState: cryptoTabReducer,
    counter: counterReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['weatherState', 'cryptoState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(configureStore)

export type AppDispatch = typeof configureStore.dispatch