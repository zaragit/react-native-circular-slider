import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PercentSlider} from './src';

export default function App() {
  const [amount, setAmount] = useState(30);
  const [percents, setPercents] = useState([30, 20, 50]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <AmountSlider size={300} amount={amount} onChange={setAmount} /> */}
      <PercentSlider size={300} percents={percents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
