//import screens 
import Start from './components/Start';
import Chat from './components/Chat';

//react/react-native elements 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { useEffect } from 'react';

//create the navigator 
const Stack = createNativeStackNavigator();

//firebase db elements 
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';



const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCVvn6-bDvXGE99-idtzqVItQ4YTLnQLTI",
    authDomain: "chat-app-b89eb.firebaseapp.com",
    projectId: "chat-app-b89eb",
    storageBucket: "chat-app-b89eb.appspot.com",
    messagingSenderId: "656546460716",
    appId: "1:656546460716:web:ac6e236c8999c0bba2cd89"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // establish a varable to check if the internet is connected.
  const connectionStatus = useNetInfo();

  //use effect to change the status of the db when online and offline.
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('connection has been lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true)
      enableNetwork(db);

  }, [connectionStatus.isConnected])


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />

        <Stack.Screen
          name='Chat'
        >
          {
            props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App