import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native"
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ db, route, navigation, isConnected }) => {
    //store the messages and pass the name, color, userID props
    const [messages, setMessages] = useState([]);
    const { name, color, userID } = route.params;

    //send new messages to the db
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])

    }

    //return text bubbles aswell as bubble styling
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000'
                },

                left: {
                    backgroundColor: '#FFF'
                }
            }}
        />
    }
    ///render the input bar to manipulate when online or offline 
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    let unsubMessages;
    useEffect(() => {
        //if there is a connection set new messaged to the db. else use the cached messages 
        if (isConnected === true) {

            //add the users name to the top of the chat 
            navigation.setOptions({ title: name });

            if (unsubMessages) {
                unsubMessages();
                unsubMessages = null;
            }

            //query the database to order by date and add new messages 
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            unsubMessages = onSnapshot(q, (documentSnapshot) => {
                let newMessages = [];
                documentSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });
                cachedMessages(newMessages);
                setMessages(newMessages);
            });

        } else loadCachedMessages();

        return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages))
    }

    const cachedMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }


    return (

        <View style={[styles.container, { backgroundColor: color }]}>
            <Text> welcome to Chat</Text>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
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