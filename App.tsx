import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
// import AmountGauge from './src/lib/Amount/AmountGauge';
import PercentGauge from './src/lib/Percent/PercentGauge';

export default function App() {
  const [size, setSize] = useState(300);
  // const [amount, setAmount] = useState(25);
  const [percents, setPercents] = useState([40, 30, 20, 10]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>{amount}</Text> */}
      {/* <AmountGauge
        scaleOptions={{clockwise: false}}
        size={size}
        amount={amount}
        onChangeAmount={setAmount}
      /> */}
      <PercentGauge percents={percents} size={size} onChange={setPercents} />
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
