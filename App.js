//import screens 
import Start from './components/start';
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
import {getStorage} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID} from "@env"


const App = () => {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // establish a varable to check if the internet is connected.
  const connectionStatus = useNetInfo();

  const storage = getStorage();

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
            props => 
            <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db}
            storage={storage}
            {...props} />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App