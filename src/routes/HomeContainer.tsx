import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AlertsRisk, Profile, MapView , CreateAlertRisk, ViewAlert , AlertRiskDetail , ClimeTime} from '../views';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import { Image } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

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
    >

    <HomeStack.Screen options={{
      headerShown:false,
    }}
    
    name="MapInfo" component={MapView} />
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

const TimeClimeStackScreen = () => (
  <ProfileStack.Navigator 
  screenOptions={{
    headerShown: false,
  }}
  >
    <ProfileStack.Screen name="clime" component={ClimeTime} />
  </ProfileStack.Navigator>
);




export default function HomeContainer() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{
            
            height:heightPercentageToDP('8%'),
            borderTopStartRadius:20,
            borderTopRightRadius:20
        
        }
      }}

      initialRouteName="MapStackScreen"
      tabBarOptions={{
        activeTintColor: '#25375b',
   
      
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
            size={size + 10}
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
              name="cloud"
              type="material-community"
              color={color}
            />
          ),
        }}
        name="TimeClimeStackScreen"
        component={TimeClimeStackScreen}
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
