
import Screen1 from './components/Start.js';
import Screen2 from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Start">

        <Stack.Screen name="Start" component={Screen1} />
        <Stack.Screen name="Chat" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;