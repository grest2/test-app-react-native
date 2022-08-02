import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';
import {FetchItems} from "../Utils/FetchItems";
import {createStackNavigator} from "@react-navigation/stack";
import {CryptoStackParamList} from "../navigation/NavigationUtils";
import {CryptoInfoViewInner} from "../views/CryptoInfoView";

const Stack = createStackNavigator<CryptoStackParamList>();

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
      <Stack.Navigator>
        <Stack.Screen name = "Crypto" component={FetchItems} options={{title: 'Crypto'}}/>
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
