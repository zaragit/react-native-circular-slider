import React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {PI, TAU} from 'react-native-redash';
import {Path} from 'react-native-svg';

import Ring from './Ring';
import {Vector} from '../types';
import {useGaugeContext} from '../context/GaugeContext';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export interface BarProps {
  color: string;
  startTheta: Animated.SharedValue<number>;
  endTheta: Animated.SharedValue<number>;
  startPosition: Animated.SharedValue<Vector>;
  endPosition: Animated.SharedValue<Vector>;
}

const thetaBetweenStartAndEnd = (start: number, end: number) => {
  'worklet';
  return start > end ? end + (TAU - start) : end - start;
};

export default function Bar({
  color,
  startTheta,
  endTheta,
  startPosition,
  endPosition,
}: BarProps) {
  const {r, scaleProps} = useGaugeContext();
  const {clockwise, width} = scaleProps;

  const isCircle = Math.abs(startTheta.value - endTheta.value) === TAU;

  const animatedProps = useAnimatedProps(() => {
    const {x: startX, y: startY} = startPosition.value;
    const {x: endX, y: endY} = endPosition.value;

    const theta = thetaBetweenStartAndEnd(startTheta.value, endTheta.value);

    const large = clockwise ? theta < PI : theta > PI;
    const largeArcFlag = large ? '1' : '0';
    const sweepFlag = clockwise ? '1' : '0';

    const d = [
      `M ${startX} ${startY}`,
      `A ${r.value} ${r.value} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`,
    ].join(' ');

    return {
      d,
      strokeWidth: width.value,
    };
  }, [clockwise]);

  return (
    <>
      {isCircle ? (
        <Ring />
      ) : (
        <AnimatedPath {...{stroke: color, animatedProps}} />
      )}
    </>
  );
}
