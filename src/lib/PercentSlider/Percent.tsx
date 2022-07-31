import React from 'react';
import {canvas2Polar, Vector} from 'react-native-redash';
import {runOnJS, useSharedValue} from 'react-native-reanimated';

import {SharedNumber} from '../../types';
import {Container} from '../../components/Container';
import {GestureContext} from '../../components/Gesture';
import {FilledGauge, Thumb} from '../../components/svg';
import {
  moveable,
  normalize,
  percent2Theta,
  theta2Percent,
} from '../../utils/worklets';
import {useSliderContext, useThumbContext} from '../../context/SliderContext';

export interface PercentProps {
  percents: number[];
  filledColor: string[];
  onChange?: (percents: number[]) => void;
}

export function Percent({percents, filledColor, onChange}: PercentProps) {
  const {center} = useSliderContext();
  const {colors} = useThumbContext();

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

  const onGestureEnd = ({x, y}: Vector, context: GestureContext) => {
    'worklet';
    context.target.value = null;
    if (onChange) {
      runOnJS(onChange)(
        thetas.reduce((acc, cur, index, arr) => {
          const prev = arr[index - 1] || arr[arr.length - 1];
          acc.push(theta2Percent(cur.value, prev.value));
          return acc;
        }, [] as number[]),
      );
    }
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
            color={filledColor[index]}
          />,
        );
        return acc;
      }, [] as React.ReactNode[])}

      {thetas.map((theta, index) => (
        <Thumb key={index} theta={theta} color={colors[index]} />
      ))}
    </Container>
  );
}
