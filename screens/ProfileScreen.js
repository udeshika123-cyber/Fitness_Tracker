import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('username').then(value => {
      if (value) {
        setSavedName(value);
      }
    });
  }, []);

  const saveName = async () => {
    await AsyncStorage.setItem('username', name);
    setSavedName(name);
    setName('');
    alert('✅ Name saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Your Profile</Text>
      <Text style={styles.label}>Enter Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Udeshi"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save Name" onPress={saveName} />

      {savedName ? <Text style={styles.greet}>Hi, {savedName} 👋</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  label: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 6, padding: 10, marginBottom: 10 },
  greet: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
});
