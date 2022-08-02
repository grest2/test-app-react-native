import {Currency, NavParams} from "../Utils/FetchItems";
import React from "react";
import {Text, View} from "react-native";
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
        const { crypto } = route.params
        console.log(route.params.crypto);
        return (
            <View>
                <Text> Crypto name: {crypto.name} </Text>
                <Text> Crypto symbol: {crypto.symbol}</Text>
                <Text> Crypto price: {crypto.priceUsd}$</Text>
            </View>
        )
    }
}