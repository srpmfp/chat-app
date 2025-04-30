
import Screen1 from './components/Start.js';
import Screen2 from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Start">

          <Stack.Screen name="Start" component={Screen1} />
          <Stack.Screen name="Chat" component={Screen2} />
        </Stack.Navigator>
      </GestureHandlerRootView>
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