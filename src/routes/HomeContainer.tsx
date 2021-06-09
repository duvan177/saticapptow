import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AlertsRisk, Profile, MapView , CreateAlertRisk, ViewAlert , AlertRiskDetail} from '../views';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import { Image } from 'react-native';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AlertStack = createStackNavigator();


const AlertStackScreen = () => (
  <AlertStack.Navigator
    initialRouteName="Alerts"
    screenOptions={{
      headerShown: false,
      
    }}>
    <AlertStack.Screen name="Alerts" component={AlertsRisk} />
    <AlertStack.Screen name="ViewAlert" component={ViewAlert} />


  </AlertStack.Navigator>
);
const MapStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name="MapInfo" component={MapView} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator 
  screenOptions={{
    headerShown: false,
  }}
  >
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default function HomeContainer() {
  return (
    <Tabs.Navigator
      
      initialRouteName="MapStackScreen"
      tabBarOptions={{
        activeTintColor: '#25375b',
        style:{
          height:60,
          borderTopStartRadius:20,
          borderTopRightRadius:20
        },
        showLabel:false
        
      }}>
  
      <Tabs.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              size={size}
              name="bell-ring"
              type="material-community"
              color={color}
            />
          ),
        }}
        name="AlertStackScreen"
        component={AlertStackScreen}
      />
        <Tabs.Screen
      
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
            style={{
              
            }}
            size={size * 2}
            name="map-marker-radius"
            type="material-community"
            color={color}
          />
          ),
          
        }  }
        
        name="MapStackScreen"
        component={MapStackScreen}
      />

         <Tabs.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              size={size}
              name="account"
              type="material-community"
              color={color}
            />
          ),
        }}
        name="ProfileStackScreen"
        component={ProfileStackScreen}
      />
    </Tabs.Navigator>
  );
}
