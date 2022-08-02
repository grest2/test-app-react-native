import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {NavigationContainer} from "@react-navigation/native";
import TabOneScreen from "./screens/TabOneScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import {configureStore, persistor} from "./redux/store";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


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