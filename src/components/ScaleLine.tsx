import React from 'react';
import {polar2Canvas, Vector} from 'react-native-redash';
import {useAnimatedProps} from 'react-native-reanimated';

import {AnimatedLine, AnimatedText} from './Animated';
import {useGaugeContext} from '../context/GaugeContext';

export interface ScaleLine {
  theta: number;
  text?: string;
}

const vector = (theta: number, radius: number, center: Vector) => {
  'worklet';
  return polar2Canvas(
    {
      theta,
      radius,
    },
    center,
  );
};

export default function ScaleLine({theta, text}: ScaleLine) {
  const {r, center, scaleOptions} = useGaugeContext();
  const {width, color, lineWidth, lineLength} = scaleOptions;

  const animatedLineProps = useAnimatedProps(() => {
    const v1 = vector(theta, r.value - width.value / 2, center.value);
    const v2 = vector(
      theta,
      r.value - width.value / 2 - (text ? lineLength : lineLength / 2),
      center.value,
    );

    return {
      x1: v1.x,
      y1: v1.y,
      x2: v2.x,
      y2: v2.y,
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    const v = vector(
      theta,
      r.value - width.value / 2 - lineLength - 10,
      center.value,
    );

    return {
      x: v.x,
      y: v.y,
    };
  });

  return (
    <>
      <AnimatedLine
        animatedProps={animatedLineProps}
        stroke={color}
        strokeWidth={lineWidth}
        strokeLinecap="round"
      />
      {text && (
        <AnimatedText
          animatedProps={animatedTextProps}
          fontSize="10"
          stroke={color}
          strokeWidth={0.8}
          textAnchor="middle"
          alignmentBaseline="middle">
          {text}
        </AnimatedText>
      )}
    </>
  );
}
