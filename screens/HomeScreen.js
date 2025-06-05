import React from 'react';
import { View, Text, Button, StyleSheet,useColorScheme } from 'react-native';
import * as Notifications from 'expo-notifications';
import { scheduleWorkoutReminder } from '../notificationHelper';

const scheduleReminder = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏋️ Workout Reminder",
      body: "Don't forget to log your workout today, Udeshi!",
    },
    trigger: { seconds: 10 }, // sends in 10 seconds
  });
};

export default function HomeScreen({ navigation }) {

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      gap: 15,
      padding: 20,
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    button: {
      marginVertical: 6,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏋️‍♂️ Fitness Tracker</Text>
      <Button title="Log Workout" onPress={() => navigation.navigate('Log Workout')} />
      <Button title="View Progress" onPress={() => navigation.navigate('Progress')} />
      <Button title="Set Goals" onPress={() => navigation.navigate('Goals')} />
      <Button title="My Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Test Reminder" onPress={scheduleWorkoutReminder} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});
