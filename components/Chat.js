import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar, Bubble, onSend } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { onSnapshot, orderBy, collection, addDoc, query } from 'firebase/firestore';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Chat = ({ navigation, route, db, isConnected, storage }) => {
    const { background, name, userID } = route.params;
    const [messages, setMessages] = useState([]);


    // Add message to db with uid and date
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
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
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(newMessages) || []);
        } catch (error) {
            console.log(error.message)
        }
    }

    // render the input toolbar only if connected to the internet
    const keyboardInput = (props) => {
        if (isConnected === true) {
            return <InputToolbar {...props} />
        } else {
            return null;
        }
    }

    // create a reference to the messages collection

    let unsubMessages;


    // load messages from firestore when connected
    //  and set the title and background color to the screen through route.param
    // and set the messages to the state
    // if not connected, load messages from async storage

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

                // add new messages
                let newMessages = [];
                docQuery.forEach(doc => {
                    newMessages.push({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                        user: { _id: doc.data().user._id, name: doc.data().user.name },
                        location: doc.data().location,
                        image: doc.data().image
                    });

                })
                // store the new messages in async storage
                cachedMessages(newMessages)
                // set the messages to the state
                setMessages(newMessages);
            })
        } else { loadCachedMessages() } // if not connected, load messages from async storage


        //clean up function to unsubscribe from the snapshot listener

        return () => { if (unsubMessages) unsubMessages(); }

    }, [isConnected]);

    const renderBubble = (props) => {

        // Customizing the bubble style based on the message sender
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#ADD8E6"
                }
            }}
        />
    }

    // Customizing the actions button to include taking photos, picking images, and getting location
    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} onSend={onSend} {...props} />;
    }



    // Customizing the view for messages depending on the message type
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{ width: 150, height: 100, borderRadius: 13 }}
                    region={{
                        latitude: currentMessage.Location.latitude,
                        longitude: currentMessage.Location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            );
        }
        return null;

    }
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Welcome {name}!</Text>

            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderActions={renderCustomActions}
                renderInputToolbar={keyboardInput}
                renderCustomView={renderCustomView}
                onSend={messages => onSend(messages)}
                createdAt={new Date()}
                user={{
                    name: name,
                    _id: userID
                }}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : Platform.OS === 'ios' ? 'padding' : 'undefined'} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;