import {Component, useEffect, useState} from "react";
import {FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import {ActionCreator} from "redux";
import {setWeather} from "../redux/actions";
import {useDispatch} from "react-redux";
import {configureStore} from "../App";
import {useAppDispatch} from "../hooks/ReduxHooks";


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
    const [dataSource, setData] = useState<Weather>({ temperature : "", wind : "", forecast : [], description : ""});

    const dispatch = useDispatch()

    const fetchWeather = () => {
        fetch(`https://goweather.herokuapp.com/weather/${props.cityValue}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                dispatch(setWeather(json))
                setData(json)
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        fetchWeather()
    }, []);

    return (
        <View>
            <Text style = { styles.headerText }>{props.cityValue}</Text>
            <Text>Wind: {dataSource.wind}</Text>
            <Text>Temperature: {dataSource.temperature}</Text>
            <Text>Description: {dataSource.description}</Text>
            <Text style = {styles.listHeaderStyle}>Others days</Text>
            <FlatList
                data={dataSource.forecast}
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
