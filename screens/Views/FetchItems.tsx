import React, {Component} from "react";
import {FlatList, Text, View, ListRenderItemInfo} from "react-native";
import {connect} from "react-redux";
import {SET_CRYPTO} from "../../redux/actions";
import {Action, Dispatch} from "redux";
import {AppState, CryptoTabState} from "../../redux/reducers";
import {CryptoInfoViewInner} from "../../views/CryptoInfoView";
import {NavigationScreenProp, NavigationState} from "react-navigation";

interface ReduxProps {
    state: CryptoTabState;
}

export interface NavParams {
    crypto: Currency
}

interface ReduxActions {
    setCrypto: (crypto: Array<Currency>) => void;
}

interface OwnProps {
    navigation: NavigationScreenProp<ReduxProps, NavParams>;
}

type Props = ReduxProps & ReduxActions & OwnProps;

export interface Currency {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
}

interface State {
    isLoading: boolean;
    dataSource: Array<Currency>;
}

export class FetchItemsInner extends React.Component<Props, State> {
    static navigationOptions = {
        title: "Crypto"
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        return fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => {
                this.props.setCrypto(json.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        console.log('Updated Props: ', this.props.state.crypto?.length);
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.props.state.crypto }
                    renderItem={(item: ListRenderItemInfo<Currency>) =>
                        <Text onPress={()=> {
                            this.props.navigation.navigate<NavParams>('CryptoInfoView',
                                {crypto: {id: item.item.id, name: item.item.name, symbol: item.item.symbol, priceUsd: item.item.priceUsd}});
                        }}>
                            {item.item.name}
                        </Text>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({ state: state.cryptoState });

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setCrypto: (crypto: Array<Currency>) => dispatch({type: SET_CRYPTO, payload: crypto})
})

export const FetchItems = connect<ReduxProps, ReduxActions, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(FetchItemsInner);