import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {FetchWeatherComp} from "../Utils/FetchWeather";
import {InputText} from "../components/InputComponent";
import {useState} from "react";

export default function TabTwoScreen() {
      const [text, setText] = useState("Moscow");
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Weather</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <InputText
              value={ text }
              onChange={(text) => setText(text)}
          />
          <FetchWeatherComp
              path="/Utils/FetchWeather.tsx"
              cityValue={text}
          />
        </View>
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
