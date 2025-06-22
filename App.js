import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
// import { registerForPushNotificationsAsync } from './notificationHelper';
// import { scheduleWorkoutReminder } from './notificationHelper';


// Import screens (we will create these next)
import HomeScreen from './screens/HomeScreen';
import LogWorkoutScreen from './screens/LogWorkoutScreen';
import ProgressScreen from './screens/ProgressScreen';
import GoalsScreen from './screens/GoalsScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  // Register for push notifications
  useEffect(() => {
    // registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Log Workout" component={LogWorkoutScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
