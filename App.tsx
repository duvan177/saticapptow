import React, { useEffect } from 'react';
import Root from './src/routes';
import {Provider as StateProvider} from 'react-redux';
import store from './src/store/store';
import {Platform, StatusBar} from 'react-native';
import { io } from 'socket.io-client'
import PushNotification from 'react-native-push-notification';
import { DNS } from './src/api';

const App = (): JSX.Element => {
  const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
    transports: ['websocket'], // you need to explicitly tell it to use websockets
   };

    
  return (
    <StateProvider store={store}>
      <StatusBar 
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />
      <Root />
    </StateProvider>
  );
};

export default App;
