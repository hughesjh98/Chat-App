import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, } from "react-native";


const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [isActive, setIsActive] = useState(false);

    const bgColors = {
        mint: { backgroundColor: "#36FFAD" },
        blue: { backgroundColor: "#65CEFF" },
        purple: { backgroundColor: "#9871EB" },
        pink: { backgroundColor: "#FD77FF" },
    };
    const { mint, blue, purple, pink } = bgColors

    const handlePress = () => {
        setIsActive(current => !current)
    };

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
                    style={styles.TextInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='your name'
                />

                <View style={styles.colorSelect}>
                    <Text>choose your background color:</Text>
                    <View style={styles.colorSelect__dotsWrapper}>
                        <TouchableOpacity
                            style={[styles.colorSelect__dot, mint]}
                            onPress={() => setColor('#36FFAD')}
                        />

                        <TouchableOpacity
                            style={[styles.colorSelect__dot, blue]}
                            onPress={() => setColor('#65CEFF')}

                        />

                        <TouchableOpacity
                            style={[styles.colorSelect__dot, purple]}
                            onPress={() => setColor('#9871EB')}
                        />

                        <TouchableOpacity
                            style={[styles.colorSelect__dot, pink]}
                            onPress={() => setColor('#FD77FF')}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigation.navigate('Chat', { name: name, color: color })}
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
        height: '50%',
        width: '90%',
        marginBottom: 35,
        alignItems: "center",
        justifyContent: 'space-between'
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