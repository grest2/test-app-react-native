import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {LoginScreen} from "./Views/LoginView";
import {useAppSelector} from "../hooks/ReduxHooks";
import {UserLogged} from "./Views/AppEntered";

export default function TabThreeScreen() {
    const state = useAppSelector((state) => state.userState);


    if(state.user.id != 0) {
        return (
            <View style ={styles.container}>
                <UserLogged/>
            </View>
        );
    }

    return (
        <View style ={styles.container}>
            <Text style={styles.title}> App Entry</Text>
            <LoginScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});