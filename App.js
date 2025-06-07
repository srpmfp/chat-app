
import Screen1 from './components/Start.js';
import Screen2 from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWd-1AePMOtGStOnhMCYdWsnUm3l0Sfnw",
  authDomain: "chat-app-e8858.firebaseapp.com",
  projectId: "chat-app-e8858",
  storageBucket: "chat-app-e8858.firebasestorage.app",
  messagingSenderId: "152190473404",
  appId: "1:152190473404:web:87752f045962053878ecb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator(
);

const App = () => {
  return (

    <NavigationContainer style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Start">
          <Stack.Screen name="Start" component={Screen1} />
          <Stack.Screen name="Chat">
            {(props) => <Screen2 db={db} {...props} />}
          </Stack.Screen>
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