import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GoalsScreen() {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadGoal = async () => {
  const g = await AsyncStorage.getItem('fitnessGoal');
  const savedWeek = await AsyncStorage.getItem('goalWeek');
  const currentWeek = getCurrentWeek();

  if (savedWeek && parseInt(savedWeek) !== currentWeek) {
    // New week: reset goal and progress
    await AsyncStorage.removeItem('fitnessGoal');
    await AsyncStorage.setItem('goalWeek', currentWeek.toString());
    setSavedGoal(null);
    setProgress(0);
    return;
  }

  if (g) {
    setSavedGoal(parseInt(g));
  }

  const p = await AsyncStorage.getItem('workouts');
  if (p) {
    const workouts = JSON.parse(p);
    const total = workouts.reduce((sum, w) => sum + w.calories, 0);
    setProgress(total);
  }
};


    loadGoal();
  }, []);

    const getCurrentWeek = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil(dayOfYear / 7);
};

  const saveGoal = async () => {
    if (!goal) {
      Alert.alert('Please enter a goal');
      return;
    }
    await AsyncStorage.setItem('fitnessGoal', goal);
    setSavedGoal(parseInt(goal));
    setGoal('');
    Alert.alert('🎯 Goal saved successfully!');
    await AsyncStorage.setItem('goalWeek', getCurrentWeek().toString());

  };

  const resetGoal = async () => {
  await AsyncStorage.removeItem('fitnessGoal');
  setSavedGoal(null);
  setProgress(0);
  Alert.alert('🔁 Goal has been reset');
};
<Button title="Reset Goal" color="red" onPress={resetGoal} />


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Set Your Fitness Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter goal (e.g. 1000 calories)"
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
      />

      <Button title="Save Goal" onPress={saveGoal} />
      <Button title="Reset Goal" color="red" onPress={resetGoal} />


      {savedGoal !== null && (
        <View style={styles.goalBox}>
          <Text style={styles.goalText}>🔥 Goal: {savedGoal} calories</Text>
          <Text style={styles.progressText}>
            Progress: {progress} / {savedGoal} kcal
          </Text>
          <Text style={{ fontSize: 16, color: progress >= savedGoal ? 'green' : 'red' }}>
            <Text style={{ fontSize: 16, color: progress >= savedGoal ? 'green' : 'orange' }}>
                {progress >= savedGoal
                    ? '✅ Goal Achieved! Keep it up!'
                    : progress === 0
                    ? '🚀 Let’s get started!'
                    : progress < savedGoal / 2
                    ? '💪 You’re on your way!'
                    : '🔥 Almost there! Push through!'}
                </Text>

            {progress >= savedGoal ? '✅ Goal Achieved!' : '📈 Keep Going!'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  goalBox: {
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  goalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  progressText: { fontSize: 18, marginBottom: 5 },

  
});
