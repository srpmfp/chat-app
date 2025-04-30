import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform } from 'react-native';


const Screen2 = ({ route, navigation }) => {
    const { background, name } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: name,
            backgroundColor: background,
        })

    }, []);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Welcome {name}!</Text>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Screen2;