import React from "react";
import {AppState, UserState} from "../../redux/reducers";
import {connect} from "react-redux";
import {View} from "react-native";
import {Text} from "../../components/Themed";

interface ReduxProps {
    state: UserState
}

interface OwnProps {

}

type Props = OwnProps & ReduxProps;

interface State {
    isLoading: boolean
}

export class UserLoggedIn extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.state.user.email}</Text>
                <Text>{this.props.state.user.lastName}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state: AppState) => ({state: state.userState});

export const UserLogged = connect(mapStateToProps)(UserLoggedIn);