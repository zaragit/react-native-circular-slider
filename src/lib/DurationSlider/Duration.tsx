import React from 'react';
import {canvas2Polar, Vector} from 'react-native-redash';
import {runOnJS, useSharedValue} from 'react-native-reanimated';

import {
  amount2Theta,
  moveable,
  normalize,
  theta2Amount,
} from '../../utils/worklets';
import {
  useSliderContext,
  useThumbContext,
  useTickMarkContext,
} from '../../context/SliderContext';
import {Container} from '../../components/Container';
import {FilledGauge, Thumb} from '../../components/svg';
import {GestureContext} from '../../components/Gesture';

export interface DurationProps {
  duration: {start: number; end: number};
  filledColor: string;
  onChange?: (duration: {start: number; end: number}) => void;
}

export function Duration({duration, filledColor, onChange}: DurationProps) {
  const {center, clockwise} = useSliderContext();
  const {total} = useTickMarkContext();
  const {colors} = useThumbContext();

  const startTheta = useSharedValue(
    amount2Theta(duration.start, total, clockwise),
  );
  const endTheta = useSharedValue(amount2Theta(duration.end, total, clockwise));

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
      const delta = theta - context.offset;
      startTheta.value = normalize(startTheta.value + delta);
      endTheta.value = normalize(endTheta.value + delta);
      context.offset = theta;
    }
  };

  const onGestureEnd = ({x, y}: Vector, context: GestureContext) => {
    'worklet';
    context.target.value = null;

    if (onChange) {
      runOnJS(onChange)({
        start: theta2Amount(startTheta.value, total, clockwise),
        end: theta2Amount(endTheta.value, total, clockwise),
      });
    }
  };

  return (
    <Container
      thetas={[startTheta, endTheta]}
      onGestureActive={onGestureActive}
      onGestureEnd={onGestureEnd}>
      <FilledGauge
        startTheta={startTheta}
        endTheta={endTheta}
        color={filledColor}
      />
      <Thumb theta={startTheta} color={colors[0]} />
      <Thumb theta={endTheta} color={colors[1]} />
    </Container>
  );
}
