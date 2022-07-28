import React, {useCallback} from 'react';
import {runOnJS, useSharedValue} from 'react-native-reanimated';
import {canvas2Polar, PI, TAU, Vector} from 'react-native-redash';

import {SharedNumber} from '../../types';
import {Container} from '../../components/Container';
import {GestureContext} from '../../components/Gesture';
import {FilledGauge, Thumb} from '../../components/svg';
import {moveable, normalize} from '../../utils/worklets';
import {useSliderContext} from '../../context/SliderContext';

export interface PercentProps {
  percents: number[];
  thumbColor: string[];
  filledGaugeColor: string[];
  onChange?: (percents: number[]) => void;
}

export function Percent({
  percents,
  thumbColor,
  filledGaugeColor,
  onChange = () => {},
}: PercentProps) {
  const {center} = useSliderContext();

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
    [] as SharedNumber[],
  );

  const onGestureActive = ({x, y}: Vector, context: GestureContext) => {
    'worklet';
    const {theta} = canvas2Polar({x, y}, center.value);

    if (context.target.value) {
      const {prev, curr, next} = context.target.value;
      const delta = normalize(theta);

      if (moveable(curr.value, next.value, delta)) {
        curr.value = delta;
      }

      if (moveable(prev.value, curr.value, delta)) {
        curr.value = delta;
      }

      context.offset = curr.value;
    } else {
      if (context.offset) {
        const delta = theta - context.offset;
        thetas.forEach(t => (t.value = normalize(t.value + delta)));
        context.offset = theta;
      }
    }
  };

  const onGestureEnd = () => {
    'worklet';
    runOnJS(onChange)(
      thetas.reduce((acc, cur, index, arr) => {
        const prev = arr[index - 1] || arr[arr.length - 1];
        acc.push(theta2Percent(cur.value, prev.value));
        return acc;
      }, [] as number[]),
    );
  };

  return (
    <Container
      thetas={thetas}
      onGestureActive={onGestureActive}
      onGestureEnd={onGestureEnd}>
      {thetas.reduce((acc, cur, index, arr) => {
        const prev = arr[index - 1] || arr[arr.length - 1];
        acc.push(
          <FilledGauge
            key={index}
            startTheta={prev}
            endTheta={cur}
            color={filledGaugeColor[index]}
          />,
        );
        return acc;
      }, [] as React.ReactNode[])}

      {thetas.map((theta, index) => (
        <Thumb key={index} theta={theta} color={thumbColor[index]} />
      ))}
    </Container>
  );
}
