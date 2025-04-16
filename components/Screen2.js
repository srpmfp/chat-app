import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Screen2 = ({ route, navigation }) => {
    const { background, name } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: name,
            backgroundColor: background,
        })

    }, []);
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Welcome {name}!</Text>
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