import React, {Component} from "react";
import {FlatList, ActivityIndicator, Text, View, ScrollView, Button, LogBox} from "react-native";

export default class FetchItems extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { dataSource: [] };
    }

    componentDidMount() {
        return fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => {

                this.state = {
                    dataSource: json
                }

                this.setState({
                    isLoading: true,
                    dataSource: json.currencyes
                })
                console.log(this.state.dataSource)
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
                    renderItem={this.state.renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}