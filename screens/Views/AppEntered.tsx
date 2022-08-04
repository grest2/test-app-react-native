import React from "react";
import {AppState, UserState} from "../../redux/reducers";
import {connect} from "react-redux";
import {Button, View} from "react-native";
import {Text} from "../../components/Themed";
import {EncryptedStoreWrapper} from "../../Utils/EncryptedStoreWrapper";
import {User} from "./LoginView";
import {Action, Dispatch} from "redux";
import {SET_USER} from "../../redux/actions";

interface ReduxProps {
    state: UserState
}

interface OwnProps {

}

interface ReduxActions {
    setUser: (user: User) => void;
}

type Props = OwnProps & ReduxProps & ReduxActions;

interface State {
    isLoading: boolean
}

export class UserLoggedIn extends React.Component<Props, State> {

    onLogout() {
        EncryptedStoreWrapper.deleteSession()
            .then(() => {
                const user = {
                    id: 0,
                    email: "",
                    lastName: "",
                }
                this.props.setUser(user);
            })
    }

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.state.user.email}</Text>
                <Text>{this.props.state.user.lastName}</Text>
                <Button title = {'Logout'} color = {'red'} onPress={ () => this.onLogout()}/>
            </View>
        )
    }
}

const mapStateToProps = (state: AppState) => ({state: state.userState});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setUser: (user: User) => dispatch({type: SET_USER, payload: user})
})

export const UserLogged = connect<ReduxProps, ReduxActions, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(UserLoggedIn);