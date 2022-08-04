import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';
import {FetchItems} from "./Views/FetchItems";
import {createStackNavigator} from "@react-navigation/stack";
import {CryptoStackParamList} from "../navigation/NavigationUtils";
import {CryptoInfoViewInner} from "../views/CryptoInfoView";
import {useEffect, useState} from "react";
import {useNavigationContainerRef} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {setCounter} from "../redux/actions";

const Stack = createStackNavigator<CryptoStackParamList>();

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const state = useAppSelector((state) => state.counter);

  return (
      <Stack.Navigator >
        <Stack.Screen name = "Crypto" component={FetchItems} options={{title: `Crypto ${state}`}}/>
        <Stack.Screen name = "CryptoInfoView" component={CryptoInfoViewInner} options={{title: 'Crypto Info'}}></Stack.Screen>
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
