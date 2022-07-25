import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

import {AmountGauge, PercentGauge, DurationGauge} from './src/lib';

export default function App() {
  const [size, setSize] = useState(230);
  const [amount, setAmount] = useState(25);
  const [percents, setPercents] = useState([40, 30, 20, 10]);
  const [duration, setDuration] = useState({
    start: 10,
    end: 50,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>{amount}</Text> */}
      <AmountGauge
        scaleOptions={{clockwise: true}}
        size={size}
        amount={amount}
        onChangeAmount={setAmount}
      />
      <PercentGauge percents={percents} size={size} onChange={setPercents} />
      <DurationGauge
        size={size}
        duration={duration}
        scaleOptions={{clockwise: true}}
        onChange={setDuration}
      />
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
