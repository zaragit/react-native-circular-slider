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

import Ring from '../../components/Ring';
import Canvas from '../../components/Canvas';
import {normalize} from '../../utils/worklets';
import Gesture from '../../components/Gesture';
import Pointer from '../../components/Pointer';
import ScaleRing from '../../components/ScaleRing';
import FilledGauge from '../../components/FilledGauge';
import {useGaugeContext} from '../../context/GaugeContext';

export interface PercentProps {
  percents: number[];
  pointerColor: string[];
  scaleGaugeColor: string[];
  onChange?: (percents: number[]) => void;
}

const moveable = (start: number, end: number, current: number) => {
  'worklet';
  return start > end
    ? current > start || end > current
    : current < end && current >= start;
};

export function Percent({
  percents,
  pointerColor,
  scaleGaugeColor,
  onChange = () => {},
}: PercentProps) {
  const {center} = useGaugeContext();

  const percent2Theta = useCallback((percent: number, distance = 0) => {
    'worklet';
    const theta = TAU * (percent / 100);
    return theta + distance;
  }, []);

  const theta2Percent = useCallback((theta: number, start = 0) => {
    'worklet';
    const degrees = normalize(theta - start) * (180 / PI);
    return (degrees / 360) * 100;
  }, []);

  const thetas = percents.reduce(
    (acc, cur, index) => [
      ...acc,
      useSharedValue(percent2Theta(cur, acc[index - 1]?.value)),
    ],
    [] as SharedValue<number>[],
  );

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
        thetas.forEach(t => (t.value = normalize(t.value + delta)));
        context.offset = theta;
      }
    },
    onEnd: () => {
      gestureTarget.value = null;

      runOnJS(onChange)(
        thetas.reduce((acc, cur, index, arr) => {
          const prev = arr[index - 1] || arr[arr.length - 1];
          acc.push(theta2Percent(cur.value, prev.value));
          return acc;
        }, [] as number[]),
      );
    },
  });

  return (
    <>
      <Canvas>
        <Ring />
        <ScaleRing />

        {thetas.reduce((acc, cur, index, arr) => {
          const prev = arr[index - 1] || arr[arr.length - 1];
          acc.push(
            <FilledGauge
              key={index}
              startTheta={prev}
              endTheta={cur}
              color={scaleGaugeColor[index]}
            />,
          );
          return acc;
        }, [] as React.ReactNode[])}

        {thetas.map((theta, index) => (
          <Pointer key={index} theta={theta} color={pointerColor[index]} />
        ))}
      </Canvas>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {thetas.reduce((acc, cur, index, arr) => {
            const prev = arr[index - 1] || arr[arr.length - 1];
            const next = arr[index + 1] || arr[0];
            acc.push(
              <Gesture
                key={index}
                prevTheta={prev}
                currentTheta={cur}
                nextTheta={next}
                gestureTarget={gestureTarget}
              />,
            );
            return acc;
          }, [] as React.ReactNode[])}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}
