import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native"


const Chat = ({ route, navigation }) => {

    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name })

    }, [])

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text> welcome to Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Chat