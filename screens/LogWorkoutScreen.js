import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogWorkoutScreen({ navigation }) {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async () => {
    if (!type || !duration || !calories) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      type,
      duration: Number(duration),
      calories: Number(calories),
      date: new Date().toISOString(),
    };

    try {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      const workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
      workouts.push(newWorkout);
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      Alert.alert('Workout Logged ✅', `${type} for ${duration} mins, ${calories} cal`);

      setType('');
      setDuration('');
      setCalories('');

      navigation.goBack(); // return to previous screen
    } catch (error) {
      Alert.alert('Error saving workout');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Type (e.g. Running)"
        value={type}
        onChangeText={setType}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories Burned"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Button title="Save Workout" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
  },
});
