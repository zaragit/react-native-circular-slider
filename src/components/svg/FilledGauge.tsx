import React from 'react';
import {PI, TAU} from 'react-native-redash';
import {useAnimatedProps, useDerivedValue} from 'react-native-reanimated';

import {Track} from './Track';
import {AnimatedPath} from './Animated';
import {SharedNumber} from '../../types';
import {useSliderContext} from '../../context/SliderContext';
import {position, thetaBetweenStartAndEnd} from '../../utils/worklets';

export interface FilledGaugeProps {
  color: string;
  startTheta: SharedNumber;
  endTheta: SharedNumber;
}

export function FilledGauge({color, startTheta, endTheta}: FilledGaugeProps) {
  const {r, center, trackWidth, clockwise} = useSliderContext();

  const startPosition = useDerivedValue(
    position(startTheta.value, r.value, center.value),
    [startTheta],
  );
  const endPosition = useDerivedValue(
    position(endTheta.value, r.value, center.value),
    [endTheta],
  );

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
      strokeWidth: trackWidth.value,
    };
  }, [clockwise]);
  return (
    <>
      {isFullFilled ? (
        <Track />
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
