import {useState} from "react";
import {TextInput, View, StyleSheet, Button} from "react-native";
import {InputText} from "../../components/InputComponent";
import {EncryptedStoreWrapper} from "../../Utils/EncryptedStoreWrapper";
import {useAppDispatch} from "../../hooks/ReduxHooks";
import {setUser} from "../../redux/actions";

interface AuthParams {
    data: string;
    type: string;
}

interface AuthDataModel {
    login: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    lastName: string;
}

export function LoginScreen( ) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const useDispatch = useAppDispatch();

    const authModel = {
        login: login,
        password: password
    }

    const params = {
        type: "auth",
        data: JSON.stringify(authModel)
    }

    const onLoginClick = () => {
        fetch("http://portal.wings.sgsdt.com/api/post",{method: "POST", body: JSON.stringify(params), headers: {'Content-Type': 'application/json'}})
            .then((response) => response.json())
            .then((json) => {

                console.log(json)

                const parsed = json;
                if (parsed.code === 1) {
                    EncryptedStoreWrapper.saveSession(parsed.session);
                }

                const user = {
                    id: parsed.response.user.id,
                    email: parsed.response.user.email,
                    lastName: parsed.response.user.lastName
                };
                useDispatch(setUser(user));
            })
            .catch((error) => console.log(error))
    }

    return(
        <View>
            <InputText value={login} onChange={(text) => setLogin(text)}/>
            <TextInput style={styles.input}
                       value={password}
                       onChangeText={(text) => setPassword(text)}
                       secureTextEntry={true}
            />
            <Button title={'Login'} color={'purple'} onPress={ () => onLoginClick()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        radius: 8,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        borderRadius: 8,
        borderWidth: 1,
        color: 'purple'
    }
});