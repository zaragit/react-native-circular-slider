import React, {useCallback} from 'react';
import {runOnJS, useSharedValue} from 'react-native-reanimated';
import {canvas2Polar, PI, TAU, Vector} from 'react-native-redash';

import {
  useSliderContext,
  useTickMarkContext,
} from '../../context/SliderContext';
import {Container} from '../../components/Container';
import {FilledGauge, Thumb} from '../../components/svg';
import {GestureContext} from '../../components/Gesture';
import {normalize, setClockwise} from '../../utils/worklets';

export interface AmountProps {
  amount: number;
  pointerColor: string;
  scaleGaugeColor: string;
  onChange?: (amount: number) => void;
}

export function Amount({
  amount,
  pointerColor,
  scaleGaugeColor,
  onChange,
}: AmountProps) {
  const {center, clockwise} = useSliderContext();
  const {total} = useTickMarkContext();

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

  const zeroTheta = useSharedValue(amount2Theta(0));
  const theta = useSharedValue(amount2Theta(amount));

  const onGestureActive = useCallback(
    ({x, y}: Vector, context: GestureContext) => {
      'worklet';
      if (context.target.value?.curr) {
        const {theta: newTheta} = canvas2Polar({x, y}, center.value);
        const delta = newTheta - context.offset;
        theta.value = normalize(theta.value + delta);
        context.offset = newTheta;
      }
    },
    [center.value, theta],
  );

  const onGestureEnd = useCallback(() => {
    'worklet';
    if (onChange) {
      runOnJS(onChange)(theta2Amount(theta.value));
    }
  }, [onChange, theta.value, theta2Amount]);

  return (
    <Container
      thetas={[theta]}
      onGestureActive={onGestureActive}
      onGestureEnd={onGestureEnd}>
      <FilledGauge
        color={scaleGaugeColor}
        startTheta={zeroTheta}
        endTheta={theta}
      />
      <Thumb theta={theta} color={pointerColor} />
    </Container>
  );
}
