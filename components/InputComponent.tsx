import {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";

interface InputProps {
    text: string;
}

export const InputText = (props: InputProps) => {
    const [text, onChangeText] = useState(props.text)

    return (
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
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