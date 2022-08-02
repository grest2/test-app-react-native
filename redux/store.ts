import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {cryptoTabReducer, weatherTabReducer} from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    weatherState: weatherTabReducer,
    cryptoState: cryptoTabReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(configureStore)

export type AppDispatch = typeof configureStore.dispatch