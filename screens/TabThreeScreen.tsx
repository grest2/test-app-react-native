import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {LoginScreen} from "./Views/LoginView";

export default function TabThreeScreen() {
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