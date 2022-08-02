import {Currency, NavParams} from "../Utils/FetchItems";
import React from "react";
import {Text, View} from "react-native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";


interface Props {
    navigation: NavigationScreenProp<NavigationState, NavParams>;
}

interface State {
    isLoading: boolean;
    crypto: Currency;
}

export class CryptoInfoViewInner extends React.Component<Props, State> {
    static navigationOptions = {
        title: "CryptoInfoView"
    };

    componentDidMount() {
        //const {crypto} = this.props.navigation.state.params
    }

    constructor(props: Props) {
        super(props);
        console.log(this.props.navigation)
    }

    render() {
        console.log();
        return (
            <View>
                <Text> Test </Text>
                {/*<Text> Crypto Name: {this.props.crypto.symbol}</Text>*/}
                {/*<Text> Crypto price: {this.props.crypto.priceUsd}$</Text>*/}
            </View>
        )
    }
}

const mapStateToProps = (state: )