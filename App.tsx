import React, { useEffect, useState } from 'react';
import Root from './src/routes';
import {Provider as StateProvider} from 'react-redux';
import store from './src/store/store';
import {Image, Platform, StatusBar, View} from 'react-native';
import { io } from 'socket.io-client'
import PushNotification from 'react-native-push-notification';
import { DNS } from './src/api';
const ImageP = './src/assets/images/Satic_Riesgo.jpg'


const App = (): JSX.Element => {
  const [state, setstate] = useState(true)
  const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
    transports: ['websocket'], // you need to explicitly tell it to use websockets
   };

   const Presentation = () => (
    <View style={{flex:1}}>
        <Image
          style={{
            width:'100%',
            height:'100%'
          }}
           resizeMode="stretch"
          
          source={require(ImageP)}
        />
    </View>
  )

  useEffect(() => {
    
    setTimeout(() => {
      setstate(false)
    }, 3500);
  
  }, [])
    
  return (
    <StateProvider store={store}>
      <StatusBar 
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />
      {
        state ?  <Presentation /> : <Root/>
      }
     
    </StateProvider>
  );
};

export default App;
