import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, ImportToolBar, InputToolbar } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { onSnapshot, orderBy, collection, addDoc, query, where } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Screen2 = ({ navigation, route, db, isConnected }) => {
    const { background, name, userID } = route.params;
    const [messages, setMessages] = useState([]);


    // Add message to db with uid and date
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0], {
            ...newMessages[0],
            uid: userID,
            createdAt: new Date()
        });

    }
    // async render of messages
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages');
        if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
        }
    }

    // input message into async storage
    const cachedMessages = async (newMessages) => {

        await AsyncStorage.setItem('messages', JSON.stringify(newMessages) || []);
        setMessages(newMessages);
    }
    const keyboardInput = (props) => {
        if (isConnected) {
            return
            <InputToolbar {...props} />;
        }
        else return null
    }

    // create a reference to the messages collection
    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            navigation.setOptions({
                title: name,
                backgroundColor: background,
            })
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

            unsubMessages = onSnapshot(q, (docQuery) => {

                let newMessages = [];
                docQuery.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                        user: { _id: doc.data().user._id, name: doc.data().user.name }
                    });

                })
                cachedMessages(newMessages)
                setMessages(newMessages);
            })
        } else { loadCachedMessages() }
        //clean up function to unsubscribe from the snapshot listener
        return () => { if (unsubMessages) unsubMessages(); }

    }, []);
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Welcome {name}!</Text>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                createdAt={new Date()}
                user={{
                    name: name,
                    _id: userID
                }}
            />{keyboardInput()}
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : Platform.OS === 'ios' ? 'padding' : 'undefined'} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Screen2;