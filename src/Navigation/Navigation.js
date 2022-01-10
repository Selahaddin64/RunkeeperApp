import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable} from 'react-native';

import AuthStack from './AuthStacks/AuthStack';
import routes from './routes';
import Dashboard from '../pages/Dashboard';
import colors from '../styles/colors';
import NewActivity from '../pages/NewActivity/NewActivity';
import ActivitySummaryList from '../pages/ActivitySummaryList/ActivitySummaryList';
import SummaryDetail from '../pages/SummaryDetail/SummaryDetail';
import Leaderboard from '../pages/Leaderboard';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
          <Stack.Screen
            name={routes.AUTHSTACK}
            component={AuthStack}
            screenOptions={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={routes.DASHBOARD}
            component={Dashboard}
            options={{
              title: 'Dashboard',
              headerTintColor: colors.orange,
              headerRight: () => (
                <Icon
                  name="logout"
                  size={30}
                  color={colors.orange}
                  onPress={() => auth().signOut()}
                />
              ),
            }}
          />
        )}
        <Stack.Screen
          name={routes.NEWACTIVITY}
          component={NewActivity}
          options={{
            title: 'New Activity',
            headerTintColor: colors.orange,
          }}
        />
        <Stack.Screen
          name={routes.ACTIVITYSUMMARYLİST}
          component={ActivitySummaryList}
          options={{title: 'Activity List', headerTintColor: colors.orange}}
        />
        <Stack.Screen
          name={routes.SUMMARYDETAIL}
          component={SummaryDetail}
          options={{
            title: 'Summary Detail',
            headerTintColor: colors.orange,
            headerRight: () => (
              <Pressable onPress={() => alert('Share this run')}>
                <Fontisto name="share" size={20} style={{marginRight: 12}} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name={routes.LEADERBOARD}
          component={Leaderboard}
          options={{title: 'Leaderboard', headerTintColor: colors.orange}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
