import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import TabOneScreen from "./screens/TabOneScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import {configureStore, persistor} from "./redux/store";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import TabThreeScreen from "./screens/TabThreeScreen";

export const Tab = createBottomTabNavigator();

const NAV_KEY = 'NAV_KEY';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [initialState, setInitialState] = useState();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store = {configureStore}>
            <PersistGate loading = {null} persistor={persistor}>
                    <NavigationContainer initialState={initialState}>
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
                                <Tab.Screen
                                    name = "App Entry Screen"
                                    component={TabThreeScreen}
                                />
                            </Tab.Navigator>
                        </SafeAreaProvider>
                    </NavigationContainer>
            </PersistGate>
        </Provider>
    );
  }
}