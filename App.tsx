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
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TabOneScreen from "./screens/TabOneScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const rootReducer = combineReducers({
    weatherState: weatherTabReducer,
    cryptoState: cryptoTabReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cryptoState', 'weatherState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(configureStore)

export type AppDispatch = typeof configureStore.dispatch

const Tab = createBottomTabNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store = {configureStore}>
            <PersistGate loading = {null} persistor={persistor}>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <Tab.Navigator>
                                <Tab.Screen
                                    name = "Crypto Screen"
                                    component={TabOneScreen}
                                />
                                <Tab.Screen
                                    name = "Weather Screen"
                                    component={TabTwoScreen}
                                />
                            </Tab.Navigator>
                        </SafeAreaProvider>
                    </NavigationContainer>
            </PersistGate>
        </Provider>
    );
  }
}