import {Currency, NavParams} from "../Utils/FetchItems";
import React from "react";
import {Route, Text, View} from "react-native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";


interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    route: any
}

interface State {
    isLoading: boolean;
    crypto: Currency;
}

export class CryptoInfoViewInner extends React.Component<Props, State> {
    static navigationOptions = {
        title: "CryptoInfoView"
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { navigation, route } = this.props
        console.log(route.params.crypto);
        return (
            <View>
                <Text> Test </Text>
                <Text> Crypto Name: {route.params.crypto.symbol}</Text>
                <Text> Crypto price: {route.params.crypto.priceUsd}$</Text>
            </View>
        )
    }
}