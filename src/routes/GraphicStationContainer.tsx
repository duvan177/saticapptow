import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GraphicsStation } from '../views'
const GraphicStationStack = createStackNavigator();
export default function GraphicStationContainer() {
  return (
    <GraphicStationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GraphicStationStack.Screen
        name="GraphicsStation"
        component={GraphicsStation}
      />
    </GraphicStationStack.Navigator>
  );
}
