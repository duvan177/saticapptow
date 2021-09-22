import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { Login , CreateAccount} from '../views'
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';
import GraphicStationContainer from './GraphicStationContainer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addUser} from '../store/actions';
import AlertRiskContainer from './AlertRiskContainer';
import PushNotification from 'react-native-push-notification';
import {DNS} from '../api/apiRoutes.routes';
import {io} from 'socket.io-client';
const AuthStack = createStackNavigator();

export default function Root() {
  const dispatch = useDispatch();

  const validateSesionUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        //   console.log('hay datos user' ,JSON.parse(value));
        dispatch(addUser(JSON.parse(value)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const notifi = () => {
    try {
      PushNotification.localNotification({
        // priority:"max",
        channelId: 'channel-id-1', // (required)
        title: 'Alerta SATIC',
        message: 'Se ha registrado una alerta cerca de tí.',
        soundName: 'default',
        actions: ['Yes', 'No'],
        bigText:
          'Se ha registrado una alerta cerca de tí ten encuenta las medidas de seguridad.',
        playSound: true,

        // reply_placeholder_text: "Write your response...", // (required)
        // reply_button_text: "Reply" // (required)
      });
    } catch (error) {
      console.log(error);
    }
    console.log('alerta iniciada');
  };
  useEffect(() => {
    try {
      const socketIo = io(DNS.host);
      // socketIo.open();
      // console.log(socketIo)
      // console.log('inicia el socket')
      socketIo.on('new-socket', (msg: any) => {
        console.log(msg);

        notifi();
      });
    } catch (error) {
      console.log('this socket', error);
    }
    console.log(10);
  }, []);

  useEffect(() => {
    validateSesionUser();
  }, []);

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="HomeStackContainer"
        
        screenOptions={{
          headerShown: false,
            
        }}>
        <AuthStack.Screen
          name="GraphicStationContainer"
          component={GraphicStationContainer}
        />
        <AuthStack.Screen
          options={{
            headerShown:false     
             }}
          name="AlertRiskStackContainer"
          component={AlertRiskContainer}
        />
        <AuthStack.Screen
        options={{
          headerShown:false     
           }}
        name="HomeStackContainer" 
        component={HomeContainer} />
        <AuthStack.Screen
          name="LoginStackContainer"
          component={LoginContainer}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
