import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

import {AmountSlider, DurationSlider, PercentSlider} from './src/lib';

export default function App() {
  const [size, setSize] = useState(200);
  const [amount, setAmount] = useState(25);
  const [percents, setPercents] = useState([40, 30, 20, 10]);
  const [duration, setDuration] = useState({
    start: 10,
    end: 50,
  });
  const [clockwise, setClockwise] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <AmountSlider
        size={size}
        amount={amount}
        onChange={setAmount}
        clockwise={clockwise}
        tickMarkOptions={{show: true}}
      />
      <PercentSlider percents={percents} size={size} onChange={setPercents} />
      <DurationSlider
        size={size}
        duration={duration}
        onChange={setDuration}
        clockwise={clockwise}
        tickMarkOptions={{show: true}}
      />
      <View style={{flexDirection: 'row'}}>
        {[200, 220, 240].map(s => (
          <Button key={s} title={String(s)} onPress={() => setSize(s)} />
        ))}
      </View>
      <View>
        <Button title="clockwise" onPress={() => setClockwise(prev => !prev)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
