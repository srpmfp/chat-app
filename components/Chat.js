import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Screen2 = ({ route, navigation }) => {
    const { background, name } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    };

    useEffect(() => {
        navigation.setOptions({
            title: name,
            backgroundColor: background,
        })

    }, []);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: `Hello ${name}, how can we help?`,
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.container, { backgroundColor: background }]}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Screen2;