import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {canvas2Polar, PI, TAU} from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  useGaugeContext,
  useScaleOptionsContext,
} from '../../context/GaugeContext';
import Ring from '../../components/Ring';
import Canvas from '../../components/Canvas';
import Gesture from '../../components/Gesture';
import Pointer from '../../components/Pointer';
import ScaleRing from '../../components/ScaleRing';
import FilledGauge from '../../components/FilledGauge';
import {normalize, setClockwise} from '../../utils/worklets';

export interface DurationProps {
  duration: {start: number; end: number};
  pointerColor: string;
  scaleGaugeColor: string;
  onChange?: (duration: {start: number; end: number}) => void;
}

const moveable = (start: number, end: number, current: number) => {
  'worklet';
  return start > end
    ? current > start || end > current
    : current < end && current >= start;
};

export function Duration({
  duration,
  pointerColor,
  scaleGaugeColor,
  onChange = () => {},
}: DurationProps) {
  const {center} = useGaugeContext();
  const {total, clockwise} = useScaleOptionsContext();

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

  const startTheta = useSharedValue(amount2Theta(duration.start));
  const endTheta = useSharedValue(amount2Theta(duration.end));

  const gestureTarget = useSharedValue<{
    prevTheta: SharedValue<number>;
    currentTheta: SharedValue<number>;
    nextTheta: SharedValue<number>;
  } | null>(null);

  const onGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offset: number}
  >({
    onStart: ({x, y}, context) => {
      const {theta} = canvas2Polar({x, y}, center.value);
      context.offset = theta;
    },
    onActive: ({x, y}, context) => {
      const {theta} = canvas2Polar({x, y}, center.value);

      if (gestureTarget.value) {
        const {prevTheta, currentTheta, nextTheta} = gestureTarget.value;
        const delta = normalize(theta);

        if (moveable(currentTheta.value, nextTheta.value, delta)) {
          currentTheta.value = delta;
        }

        if (moveable(prevTheta.value, currentTheta.value, delta)) {
          currentTheta.value = delta;
        }

        context.offset = currentTheta.value;
      } else {
        const delta = theta - context.offset;
        startTheta.value = normalize(startTheta.value + delta);
        endTheta.value = normalize(endTheta.value + delta);
        context.offset = theta;
      }
    },
    onEnd: () => {
      gestureTarget.value = null;

      runOnJS(onChange)({
        start: theta2Amount(startTheta.value),
        end: theta2Amount(endTheta.value),
      });
    },
  });

  return (
    <>
      <Canvas>
        <Ring />
        <ScaleRing />
        <FilledGauge
          startTheta={startTheta}
          endTheta={endTheta}
          color={scaleGaugeColor}
        />
        <Pointer theta={startTheta} color={pointerColor} />
        <Pointer theta={endTheta} color={pointerColor} />
      </Canvas>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Gesture
            prevTheta={endTheta}
            currentTheta={startTheta}
            nextTheta={endTheta}
            gestureTarget={gestureTarget}
          />
          <Gesture
            prevTheta={startTheta}
            currentTheta={endTheta}
            nextTheta={startTheta}
            gestureTarget={gestureTarget}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}
