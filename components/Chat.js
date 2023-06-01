import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native"
import { GiftedChat } from "react-native-gifted-chat";


const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);
    const { name, color } = route.params;

    const onSend = (newMessages) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))

    }

    useEffect(() => {
        navigation.setOptions({ title: name }),
            setMessages([
                {
                    _id: 1,
                    text: 'hello developer',
                    createdAt: new Date(),

                    user: {
                        _id: 2,
                        name: 'react native',
                        avatar: "https://placeimg.com/140/140/any",
                    },
                },
                {
                    _id:2,
                    text:'this is a system message',
                    createdAt: new Date(),
                    system:true,
                },
            ]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text> welcome to Chat</Text>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {
                Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
            }
            {
                Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Chat