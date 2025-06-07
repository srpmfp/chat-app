import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { onSnapshot, orderBy, collection, addDoc, query, where } from 'firebase/firestore';



const Screen2 = ({ navigation, route, db }) => {
    const { background, name, userID } = route.params;
    const [messages, setMessages] = useState([]);



    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0], {
            ...newMessages[0],
            uid: userID,
            createdAt: new Date()
        });

    }

    useEffect(() => {
        navigation.setOptions({
            title: name,
            backgroundColor: background,
        })
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

        const unsubMessages = onSnapshot(q, (docQuery) => {

            let newMessages = [];
            docQuery.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                    user: { _id: doc.data().user._id, name: doc.data().user.name }
                });

            })

            setMessages(newMessages);
        })
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

export default Screen2;