import {useEffect} from "react";
import {FlatList, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import {setCounter, setWeather} from "../../redux/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/ReduxHooks";
import { AsyncStorage } from "react-native";


export interface WeatherTabState {
    weather: Weather;
    name: string;
}

export interface Weather {
    temperature: string;
    wind: string;
    description: string;
    forecast: Array<DayWeather>
}

interface DayWeather {
    day: string;
    temperature: string;
    wind: string;
}

interface FetchWeatherProps {
    path: string;
    cityValue: string;
}

export const FetchWeatherComp = (props: FetchWeatherProps) => {

    const state = useAppSelector((state) => state.weatherState);
    const useDispatch = useAppDispatch();

    const fetchWeather = () => {
        fetch(`https://goweather.herokuapp.com/weather/${props.cityValue}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                useDispatch(setWeather(json));
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        fetchWeather();
        useDispatch(setCounter(1));
    }, []);



    return (
        <View>
            <Text style = { styles.headerText }>{props.cityValue}</Text>
            <Text>Wind: {state.weather.wind}</Text>
            <Text>Temperature: {state.weather.temperature}</Text>
            <Text>Description: {state.weather.description}</Text>
            <Text style = {styles.listHeaderStyle}>Others days</Text>
            <FlatList
                data={state.weather.forecast}
                renderItem={(item: ListRenderItemInfo<DayWeather>) => <Text>{item.item.temperature}</Text>}
                keyExtractor={(item) => item.day.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold'
    },
    listHeaderStyle: {
        fontWeight: 'bold',
        paddingTop: 12
    }
})
