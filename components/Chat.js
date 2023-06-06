import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native"
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


const Chat = ({ db, route, navigation }) => {
    //store the messages and pass the name, color, userID props
    const [messages, setMessages] = useState([]);
    const { name, color, userID } = route.params;

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

    useEffect(() => {
        //add the users name to the top of the chat 
        navigation.setOptions({ title: name });

        //query the database to order by date and add new messages 
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        const unsubMessages = onSnapshot(q, (documentSnapshot) => {
            let newMessages = [];
            documentSnapshot.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        }
    }, []);

    return (

        <View style={[styles.container, { backgroundColor: color }]}>
            <Text> welcome to Chat</Text>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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