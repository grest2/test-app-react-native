import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import thunk from 'redux-thunk';
import Navigation from './navigation';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {Provider} from "react-redux";
import weatherTabReducer from "./redux/reducers";

const rootReducer = combineReducers({
  weatherTabReducer,
});

const reducer = (state: unknown, action: never) => (state ?? {});

export const configureStore = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof configureStore.dispatch

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    console.log(configureStore)
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
