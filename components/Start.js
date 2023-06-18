import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const bgColors = {
        mint: { backgroundColor: "#36FFAD" },
        blue: { backgroundColor: "#65CEFF" },
        purple: { backgroundColor: "#9871EB" },
        pink: { backgroundColor: "#FD77FF" },
    };
    const { mint, blue, purple, pink } = bgColors;

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, color: color });
                Alert.alert('signed in successfully!')
            }).catch((error) => {
                Alert.alert('unable to sign in, please try again.')
            })
    }

    return (

        //container of Start.js
        <ImageBackground
            source={require('../assets/BackgroundImage.jpg')}
            resizeMethod="scale"
            style={[styles.image, styles.container]}
        >

            <Text style={styles.title}>Chatter</Text>
            {/* login wrapper containing TextInput and colorSelect */}

            <View style={styles.loginWrapper}>
                <TextInput
                    accessible={true}
                    accessibilityLabel="enter your name"
                    accessibilityHint="lets you enter your name into the text field"
                    accessibilityRole="text"
                    style={styles.TextInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='your name'
                />
                {/* users can select the color they want for their chat */}

                <View style={styles.colorSelect}>
                    <Text>choose your background color:</Text>
                    <View style={styles.colorSelect__dotsWrapper}>
                        {/* buttons for changing the backgorund color */}

                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="change the color to mint"
                            accessibilityHint="select a color of the chat background "
                            accessibilityRole="button"
                            style={[styles.colorSelect__dot, mint]}
                            onPress={() => setColor('#36FFAD')}
                        />

                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="change the color to mint"
                            accessibilityHint="select a color of the chat background "
                            accessibilityRole="button"
                            style={[styles.colorSelect__dot, blue]}
                            onPress={() => setColor('#65CEFF')}

                        />

                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="change the color to mint"
                            accessibilityHint="select a color of the chat background "
                            accessibilityRole="button"
                            style={[styles.colorSelect__dot, purple]}
                            onPress={() => setColor('#9871EB')}
                        />

                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="change the color to mint"
                            accessibilityHint="select a color of the chat background "
                            accessibilityRole="button"
                            style={[styles.colorSelect__dot, pink]}
                            onPress={() => setColor('#FD77FF')}
                        />
                    </View>
                </View>
                {/* navigation button to the chat screen with their name and picked color */}
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="go to the chat screen"
                    accessibilityHint=" go to the chat"
                    accessibilityRole="button"
                    style={styles.Button}
                    onPress={signInUser}
                >
                    <Text style={styles.ButtonText}> go to Chat</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    title: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 45,
        fontWeight: 600,
        color: '#FFFFFF',
        marginTop: 50
    },
    loginWrapper: {
        flex: 1,
        backgroundColor: 'white',
        height: '44%',
        width: '88%',
        marginBottom: 35,
        alignItems: "center",
        justifyContent: 'space-between',
    },

    TextInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },

    Button: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#757083',
        padding: 15,
        width: '88%',
        marginTop: 15,
        marginBottom: 15
    },

    ButtonText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#FFFFFF',
    },

    colorSelect: {
        height: 75
    },

    colorSelect__dotsWrapper: {
        flexDirection: "row"
    },

    colorSelect__dot: {
        width: 40,
        height: 40,
        borderRadius: 25,
        margin: 10
    },
    colorSelect__dotSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5f5f5f",
    }
})

export default Start;