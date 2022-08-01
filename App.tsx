import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import thunk from 'redux-thunk';
import Navigation from './navigation';
import {Action, applyMiddleware, combineReducers, Dispatch, legacy_createStore as createStore} from 'redux';
import {connect, Provider} from "react-redux";
import {AppState, cryptoTabReducer, weatherTabReducer} from "./redux/reducers";
import {SET_CRYPTO} from "./redux/actions";
import {Currency} from "./Utils/FetchItems";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { persistStore, persistReducer } from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

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
let persistor = persistStore(configureStore)

export type AppDispatch = typeof configureStore.dispatch

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store = {configureStore}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
  }
}