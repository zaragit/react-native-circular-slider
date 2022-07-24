import React, {useCallback} from 'react';
import {PI, TAU} from 'react-native-redash';

import {Amount} from './index';
import Gauge, {GaugeProps} from '../Gauge';
import {normalize, setClockwise} from '../../utils/worklets';

export interface AmountGaugeProps extends GaugeProps {
  amount: number;
  pointerColor?: string;
  scaleGaugeColor?: string;
  onChangeAmount?: (amount: number) => void;
}

export default function AmountGauge({
  size,
  scaleOptions = {},
  pointerColor = '#FFA500',
  scaleGaugeColor = '#FFE5B4',
  amount,
  onChangeAmount,
}: AmountGaugeProps) {
  const {clockwise = false, total = 100} = scaleOptions;

  const amount2Theta = useCallback(
    (_amount: number) => {
      'worklet';
      const percent = (_amount / total) * 100;
      const theta = (TAU * percent) / 100;
      return setClockwise(theta, clockwise);
    },
    [total, clockwise],
  );

  const theta2Amount = useCallback(
    (theta: number) => {
      'worklet';
      const percent = (normalize(theta - 0.5 * PI) * 100) / TAU;
      const scale = (percent / 100) * total;
      return clockwise ? total - scale : scale;
    },
    [clockwise, total],
  );

  return (
    <Gauge
      {...{
        size,
        scaleOptions,
        toTheta: amount2Theta,
        fromTheta: theta2Amount,
      }}>
      <Amount
        amount={amount}
        pointerColor={pointerColor}
        scaleGaugeColor={scaleGaugeColor}
        onChangeAmount={onChangeAmount}
      />
    </Gauge>
  );
}
