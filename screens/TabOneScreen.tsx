import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {FetchItems, Currency} from "../Utils/FetchItems";
import {useAppDispatch} from "../hooks/ReduxHooks";
import {AppState} from "../redux/reducers";
import {Action, Dispatch} from "redux";
import {SET_CRYPTO} from "../redux/actions";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import {CryptoStackParamList} from "../navigation/NavigationUtils";
import {CryptoInfoView} from "../views/CryptoInfoView";

const Stack = createStackNavigator<CryptoStackParamList>();

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
      <Stack.Navigator>
        <Stack.Screen name = "Crypto" component={FetchItems}/>
        <Stack.Screen name = "CryptoInfoView" component={CryptoInfoView}></Stack.Screen>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
