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

const rootReducer = combineReducers({
    weatherState: weatherTabReducer,
    cryptoState: cryptoTabReducer,
});

export const configureStore = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof configureStore.dispatch

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store = {configureStore}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
    );
  }
}