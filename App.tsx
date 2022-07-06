import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import AmountGauge from './src/lib/AmountGauge';

export default function App() {
  const [size, setSize] = useState(300);
  const [amount, setAmount] = useState(25);

  return (
    <SafeAreaView style={styles.container}>
      <AmountGauge size={size} amount={amount} />
      <View style={{flexDirection: 'row'}}>
        <Button title="200" onPress={() => setSize(200)} />
        <Button title="300" onPress={() => setSize(300)} />
        <Button title="400" onPress={() => setSize(400)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
