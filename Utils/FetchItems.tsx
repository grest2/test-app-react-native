import React, {Component} from "react";
import {FlatList, Text, View, ListRenderItemInfo} from "react-native";
import {connect} from "react-redux";
import {SET_CRYPTO} from "../redux/actions";
import {Action, Dispatch} from "redux";
import {AppState, CryptoTabState} from "../redux/reducers";

interface ReduxProps {
    state: CryptoTabState;
}

interface ReduxActions {
    setCrypto: (crypto: Array<Currency>) => void;
}

interface OwnProps {
}

type Props = ReduxProps & ReduxActions & OwnProps;

export interface Currency {
    id: string;
    name: string;
}

interface State {
    isLoading: boolean;
    dataSource: Array<Currency>;
}

export class FetchItemsInner extends React.Component<Props, State> {

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
                        <Text onPress={()=>console.log("_LOG_ button was pressed")}>
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