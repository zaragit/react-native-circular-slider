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

import Ring from '../../components/Ring';
import Canvas from '../../components/Canvas';
import Pointer from '../../components/Pointer';
import ScaleRing from '../../components/ScaleRing';
import FilledGauge from '../../components/FilledGauge';
import CursorOverlay from '../../components/CursorOverlay';
import {useGaugeContext} from '../../context/GaugeContext';
import {containedInSquare, normalize, setClockwise} from '../../utils/worklets';

export interface AmountProps {
  amount: number;
  pointerColor: string;
  scaleGaugeColor: string;
  onChangeAmount?: (amount: number) => void;
}

export function Amount({
  amount,
  pointerColor,
  scaleGaugeColor,
  onChangeAmount,
}: AmountProps) {
  const {r, center, scaleOptions} = useGaugeContext();
  const {total, width, clockwise} = scaleOptions;

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
  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offset: number | null}
  >({
    onStart({x, y}, context) {
      if (containedInSquare({x, y}, position.value, width.value)) {
        context.offset = canvas2Polar({x, y}, center.value).theta;
      } else {
        context.offset = null;
      }
    },
    onActive({x, y}, context) {
      if (context.offset) {
        const {theta: newTheta} = canvas2Polar({x, y}, center.value);
        const delta = newTheta - context.offset;
        theta.value = normalize(theta.value + delta);
        context.offset = newTheta;
      }
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
        <FilledGauge
          color={scaleGaugeColor}
          startTheta={zeroTheta}
          endTheta={theta}
        />
        <Pointer theta={theta} color={pointerColor} />
      </Canvas>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CursorOverlay position={position} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}
