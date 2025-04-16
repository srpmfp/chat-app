import * as Font from 'expo-font';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Touchable,
} from 'react-native';
import { act, useState } from 'react';

const Screen1 = ({ navigation }) => {
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
                    <TextInput
                        placeholder={'Enter your name'}
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                    />
                    {/* Color Select box */}
                    <View style={{ width: "88%", height: 80 }} >
                        <View style={styles.bgSelectText}>
                            <Text>Choose Background Color</Text>
                        </View>
                        <View style={styles.colorSelect}>
                            <TouchableOpacity
                                style={styles.color1}
                                onPress={() => setBackground('#090C08')}
                            />
                            <TouchableOpacity
                                style={styles.color2}
                                onPress={() => { setBackground('#474056') }}
                            />
                            <TouchableOpacity style={styles.color3} onPress={() => { setBackground('#8A95A5') }} />
                            <TouchableOpacity style={styles.color4} onPress={() => { setBackground('#B9C6AE') }} />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() =>
                            navigation.navigate(
                                'Screen2',
                                { name: name, background: background }
                            )
                        }>
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
    title: {
        fontSize: 45,
        color: 'white',
        marginTop: 64,
        fontWeight: '600',
        textAlign: 'center',
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
        borderWidth: 1,
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
        // padding: '10',
        flexDirection: 'row',
        justifyContent: 'start',
        marginBottom: 50,
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
        width: '15%',
        height: '60%',
        borderRadius: '50%',
        marginTop: 10,
        backgroundColor: '#090C08',
        marginRight: 20,
    },
    color2: {
        width: '15%',
        height: '60%',
        marginTop: 10,
        borderRadius: '50%',
        backgroundColor: '#474056',
        marginRight: 20,
    },
    color3: {
        width: '15%',
        height: '60%',
        marginTop: 10,
        borderRadius: '50%',
        backgroundColor: '#8A95A5',
        marginRight: 20,
    },
    color4: {
        width: '15%',
        height: '60%',
        marginTop: 10,
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
