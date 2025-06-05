import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ProgressScreen() {
  return (
    <ScrollView>
      <LineChart
        data={{
          labels: ['1', '2', '3'],
          datasets: [{ data: [200, 300, 250] }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=" cal"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{ margin: 20, borderRadius: 10 }}
      />
    </ScrollView>
  );
}
