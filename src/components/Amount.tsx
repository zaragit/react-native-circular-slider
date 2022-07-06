import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {canvas2Polar, PI, polar2Canvas, TAU} from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import Bar from './Bar';
import Ring from './Ring';
import Canvas from './Canvas';
import Pointer from './Pointer';
import ScaleRing from './ScaleRing';
import CursorOverlay from './CursorOverlay';
import {useGaugeContext} from '../context/GaugeContext';
import {normalize, setClockwise} from '../utils/fp';

export interface AmountProps {
  amount: number;
  pointerColor: string;
  scaleGaugeColor: string;
  onChangeAmount?: (amount: number) => void;
}

export default function Amount({
  amount,
  pointerColor,
  scaleGaugeColor,
  onChangeAmount,
}: AmountProps) {
  const {r, center, scaleProps} = useGaugeContext();
  const {total, clockwise} = scaleProps;

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
  const zeroPosition = useDerivedValue(() =>
    polar2Canvas({theta: zeroTheta.value, radius: r.value}, center.value),
  );

  const theta = useSharedValue(amount2Theta(amount));
  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offset: number}
  >({
    onStart({x, y}, context) {
      context.offset = canvas2Polar({x, y}, center.value).theta;
    },
    onActive({x, y}, context) {
      const {theta: newTheta} = canvas2Polar({x, y}, center.value);
      const delta = newTheta - context.offset;
      theta.value = normalize(theta.value + delta);
      context.offset = newTheta;
    },
    onEnd() {
      if (onChangeAmount) {
        runOnJS(onChangeAmount)(theta2Amount(theta.value));
      }
    },
  });

  return (
    <>
      <Canvas>
        <Ring />
        <ScaleRing />
        <Bar
          color={scaleGaugeColor}
          startTheta={zeroTheta}
          endTheta={theta}
          startPosition={zeroPosition}
          endPosition={position}
        />
        <Pointer position={position} color={pointerColor} />
      </Canvas>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CursorOverlay position={position} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}
