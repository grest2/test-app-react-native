import React, {Component} from "react";
import {FlatList, ActivityIndicator, Text, View, ScrollView, Button, LogBox, ListRenderItemInfo} from "react-native";

interface Props {
}

interface Currency {
    id: string;
    name: string;
}

interface State {
    isLoading: boolean;
    dataSource: Array<Currency>;
}

export default class FetchItems extends Component<Props, State> {
    public state: State = {
        isLoading: false,
        dataSource: [],
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        return fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: true,
                    dataSource: json.data
                }, () => console.log(this.state.dataSource));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.state.dataSource }
                    renderItem={(item: ListRenderItemInfo<Currency>) => <Text>{item.item.name}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}