import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Login , CreateAccount} from '../views'

const LoginStack = createStackNavigator();
export default function LoginContainer() {
    return (
       <LoginStack.Navigator screenOptions={{
        headerShown:false
       }}>
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="CreateAccount" component={CreateAccount} />
       </LoginStack.Navigator>
    )
}
