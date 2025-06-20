// import * as Font from 'expo-font';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image,
} from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';



const Screen1 = ({ navigation }) => {


    const auth = getAuth();
    
    const signInUser = () => {
        signInAnonymously(auth)
            .then(() => {
                console.log('Signed in anonymously');
            })
            .catch((error) => {
                console.error('Error signing in anonymously:', error);
            });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userID = user.uid; // Get the user ID from the authenticated user
                console.log(userID);
                navigation.navigate(
                    'Chat',
                    { name: name, background: background, userID: userID } // Pass the user ID to the next screen
                )

            }
            else {

            }
        })

    }

    const [name, setName] = useState('');
    // const [fontsLoaded, setFontsLoaded] = useState(false);
    const [background, setBackground] = useState('');

    // useEffect(() => {
    //     const loadFonts = async () => {
    //         await Font.loadAsync({
    //             'CustomFont': require('../assets/fonts/CustomFont.ttf'),
    //         });
    //         setFontsLoaded(true);
    //     };

    //     loadFonts();
    // }, []);

    // if (!fontsLoaded) {
    //     return null; // Or a loading spinner
    // }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/backgroundImage.png')}
                style={styles.imageB}
            />
            {/* Overlay */}
            <View style={styles.box}>


                <Text style={styles.title}>App Title</Text>
                {/* Input Box Container  */}
                <View style={styles.inputBox}>
                    <View style={styles.txtInputBox}>
                        <Image style={styles.icnImg} source={require("../assets/icon.png")} />
                        <TextInput
                            placeholder={'Enter your name'}
                            style={styles.textInput}
                            value={name}
                            accessible={true}
                            accessibilityLabel="Name Input"
                            accessibilityHint="Enter your name here"
                            onChangeText={setName}
                        />
                    </View>
                    {/* Color Select Container */}
                    <View style={{ width: "88%", height: 80 }} >
                        <View style={styles.bgSelectText}>
                            <Text>Choose Background Color</Text>
                        </View>
                        {/* Color Select Choices */}
                        <View style={styles.colorSelect}
                            accessible={true}
                            accessibilityLabel="Color Selection"
                            accessibilityHint="Select a color for the background">
                            <View style={background === '#090C08' && styles.colorSurround}>
                                <TouchableOpacity
                                    style={styles.color1}
                                    onPress={() => setBackground('#090C08')}
                                /></View>
                            <View style={background === '#474056' && styles.colorSurround}>
                                <TouchableOpacity
                                    style={styles.color2}
                                    onPress={() => { setBackground('#474056') }}
                                /></View>
                            <View style={background === '#8A95A5' && styles.colorSurround}>
                                <TouchableOpacity style={styles.color3} onPress={() => { setBackground('#8A95A5') }} />
                            </View>
                            <View style={background === '#B9C6AE' && styles.colorSurround}>
                                <TouchableOpacity style={styles.color4} onPress={() => { setBackground('#B9C6AE') }} />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => {

                            signInUser();
                        }
                        }
                        accessibility={true}
                        accessibilityLabel="Start Chat Button"
                        accessibilityHint="Press to start chatting">
                        <Text style={styles.chatText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgSelectText: {
        alignSelf: 'start',
        width: '100%',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',

    },
    colorSurround: {
        display: 'flex',
        height: 35,
        width: 35,
        margin: '5%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#757083', // Adjust the border color as needed
        borderRadius: '50%', // Ensures the border is circular

    },
    icnImg: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    title:
    {
        fontSize: 45,
        color: 'white',
        marginTop: 64,
        fontWeight: '600',
        textAlign: 'center',
    },
    txtInputBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        width: '88%',
        height: 80,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    chatText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '300',
    },
    textInput: {
        width: '88%',
        height: 80,
        padding: 15,
        borderWidth: 0,
        marginTop: 15,
        marginBottom: 15,
    },
    box: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chatButton: {
        backgroundColor: '#757083',
        width: '88%',
        height: 80,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',

        color: '#FFFFFF',
    },
    colorSelect: {
        display: 'flex',
        width: '88%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // marginBottom: 50,
    },
    inputBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '44%',
        backgroundColor: 'white',
        width: '88%',
        alignSelf: 'center',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    color1: {
        width: 35,
        height: 35,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: '50%',

        backgroundColor: '#090C08',

    },
    color2: {
        width: 35,
        height: 35,

        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: '50%',
        backgroundColor: '#474056',
    },
    color3: {
        width: 35,
        height: 35,

        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: '50%',
        backgroundColor: '#8A95A5',

    },
    color4: {
        width: 35,
        height: 35,

        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: '50%',
        backgroundColor: '#B9C6AE',
    },

    imageB: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
export default Screen1;
