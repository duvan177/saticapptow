import React, {Component, useEffect} from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
// import { Login , CreateAccount} from '../views'
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';
import GraphicStationContainer from './GraphicStationContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addUser } from '../store/actions';
import AlertRiskContainer from './AlertRiskContainer';
import PushNotification from 'react-native-push-notification';
import {DNS} from '../api/apiRoutes.routes';
import {io} from 'socket.io-client';
import { Platform } from 'react-native';
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
    
      PushNotification.createChannel({
        channelId: "mychannel", // (required)
        channelName: "My channel", // (required)
        vibrate: true,
    }, (created) => {
      PushNotification.configure({
  
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
          
        },
      
       
      
      
        requestPermissions: Platform.OS === 'ios'
      });
      PushNotification.localNotification({
        channelId: "mychannel",
        autoCancel: true,
        bigText: 'Mantente informado y alerta, ten en cuenta las medidas de seguridad.',
        subText: 'Notification',
        title: 'SATIC al territorio',
        message: `Se ha registrado una alerta de riesgo.`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        ignoreInForeground: false,
        importance:'high',
        invokeApp:true,
        allowWhileIdle: true,
        priority:'high',
        visibility:'public'
      })
    } )

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
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          name="GraphicStationContainer"
          component={GraphicStationContainer}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="AlertRiskStackContainer"
          component={AlertRiskContainer}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeStackContainer"
          component={HomeContainer}
        />
        <AuthStack.Screen
          name="LoginStackContainer"
          component={LoginContainer}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
