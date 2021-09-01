import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { AlertRiskDetail, CreateAlertRisk } from '../views'

const AlertRisk = createStackNavigator();
export default function LoginContainer() {
    return (
       <AlertRisk.Navigator screenOptions={{
        headerShown:false
       }}>
        <AlertRisk.Screen name="CreateAlert" component={CreateAlertRisk} />
        <AlertRisk.Screen name="AlertRiskDetail" component={AlertRiskDetail} />
       </AlertRisk.Navigator>
    )
}
