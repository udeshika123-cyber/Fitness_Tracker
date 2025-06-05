// notificationHelper.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 📌 This sets up how notifications behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// ✅ Function to schedule a local notification
export async function scheduleWorkoutReminder() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Notification permission not granted');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏋️ Time to Move!",
      body: "Don’t forget to log your workout today!",
    },
    trigger: {
      seconds: 5, // ⏱️ triggers after 5 seconds
    },
  });
}
