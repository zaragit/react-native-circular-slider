import React from 'react';

import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {PI, polar2Canvas, TAU} from 'react-native-redash';

import Ring from './Ring';
import {AnimatedPath} from './Animated';
import {thetaBetweenStartAndEnd} from '../utils/worklets';
import {useGaugeContext, useScaleOptionsContext} from '../context/GaugeContext';

export interface FilledGaugeProps {
  color: string;
  startTheta: Animated.SharedValue<number>;
  endTheta: Animated.SharedValue<number>;
}

function FilledGauge({color, startTheta, endTheta}: FilledGaugeProps) {
  const {r, center} = useGaugeContext();
  const {clockwise, width} = useScaleOptionsContext();

  const position = (theta: Animated.SharedValue<number>) => {
    'worklet';
    return () => {
      'worklet';
      return polar2Canvas({theta: theta.value, radius: r.value}, center.value);
    };
  };

  const startPosition = useDerivedValue(position(startTheta), [startTheta]);
  const endPosition = useDerivedValue(position(endTheta), [endTheta]);

  const isFullFilled = Math.abs(startTheta.value - endTheta.value) === TAU;

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
      {isFullFilled ? (
        <Ring />
      ) : (
        <AnimatedPath
          data-testid="filled-gauge"
          stroke={color}
          animatedProps={animatedProps}
        />
      )}
    </>
  );
}

export default FilledGauge;
