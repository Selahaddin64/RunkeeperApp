import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../pages/auth/Login';
import Sign from '../../pages/auth/Sign';
import routes from '../../Navigation/routes';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SIGN} component={Sign} />
    </Stack.Navigator>
  );
}
