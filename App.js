import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//create the navigator 
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


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
            props => <Chat db={db} {...props} />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App