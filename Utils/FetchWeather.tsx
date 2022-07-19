import {Component, useEffect, useState} from "react";
import {FlatList, ListRenderItem, ListRenderItemInfo, Text, View} from "react-native";

interface Weather {
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
}

export const FetchWeatherComp = (props: FetchWeatherProps) => {
    const [dataSource, setData] = useState<Weather>({ temperature : "", wind : "ebanoe govno", forecast : [], description : ""});

    const fetchWeather = () => {
        fetch("https://goweather.herokuapp.com/weather/Moscow")
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data)
                setData(json)
            })
    }
    useEffect(() => {
        fetchWeather()
    }, []);

    return (
        <View>
            <Text>{dataSource.wind}</Text>
            <FlatList
                data={dataSource.forecast}
                renderItem={(item: ListRenderItemInfo<DayWeather>) => <Text>{item.item.temperature}</Text>}
                keyExtractor={(item) => item.day.toString()}
            />
        </View>
    );
}

// export default function FetchWeatherComponent(props: FetchWeatherProps) {
//     const [dataSource, setData] = useState(null);
//
//     const fetchWeather = () => {
//         fetch("https://goweather.herokuapp.com/weather/Moscow")
//             .then((response) => response.json())
//             .then((json) => {
//                 setData(json)
//                 console.log(json)
//             })
//         useEffect(() => {
//             fetchWeather()
//         }, []);
//
//         return (
//             <View>
//                 <FlatList
//                     data = {dataSource}
//                     renderItem={(item: ListRenderItemInfo<Weather>) => <Text>{item.item.temperature}</Text>}
//                     keyExtractor = {(item) => item.description.toString()}
//                 />
//             </View>
//         );
//     }
// }