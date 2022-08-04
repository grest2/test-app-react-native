import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {counterReducer, cryptoTabReducer, userReducer, weatherTabReducer} from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {createNavigationReducer} from "react-navigation-redux-helpers";
import {Tab} from "../App";

const rootReducer = combineReducers({
    weatherState: weatherTabReducer,
    cryptoState: cryptoTabReducer,
    counter: counterReducer,
    userState: userReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['weatherState', 'cryptoState', "counter", "userState"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(configureStore)

export type AppDispatch = typeof configureStore.dispatch