import {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";

interface InputProps {
    value: string;
    onChange: (text: string) => void;
}

export const InputText = (props: InputProps) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={props.onChange}
            value={props.value}
        />
    );
}

const styles = StyleSheet.create({
    input : {
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    }
})