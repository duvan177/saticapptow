import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AlertsRisk, Profile, MapView , CreateAlertRisk, ViewAlert , AlertRiskDetail , ClimeTime} from '../views';
import {createStackNavigator, CardStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import { Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator(
);
const ProfileStack = createStackNavigator();
const AlertStack = createStackNavigator();


const AlertStackScreen = () => (
  <AlertStack.Navigator
    initialRouteName="Alerts"
    
    screenOptions={{
      headerShown: false,
      // cardStyleInterpolator:CardStyleInterpolators.forBottomSheetAndroid,
      
    }}>
    <AlertStack.Screen name="Alerts" component={AlertsRisk} />
    <AlertStack.Screen 

options={{
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
}}
    name="ViewAlert" component={ViewAlert} />


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
            width: widthPercentageToDP('70%'),
            
            borderRadius:20,
            position: 'absolute',
            left: widthPercentageToDP('15%'),
            right: widthPercentageToDP('15%'),
            bottom: heightPercentageToDP('2%')
        
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
              size={size+5}
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
            size={size+10}
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
              size={size+10}
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
              size={size+10}
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
