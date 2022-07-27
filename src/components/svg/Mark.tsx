import React from 'react';
import {useAnimatedProps} from 'react-native-reanimated';

import {
  useSliderContext,
  useTickMarkContext,
} from '../../context/SliderContext';
import {vector} from '../../utils/worklets';
import {AnimatedLine, AnimatedText} from './Animated';

export interface MarkProps {
  theta: number;
  text?: string;
}

export function Mark({theta, text}: MarkProps) {
  const {r, trackWidth, center} = useSliderContext();
  const {showText, color, thickness, length} = useTickMarkContext();

  const animatedLineProps = useAnimatedProps(() => {
    const v1 = vector(theta, r.value - trackWidth.value / 2, center.value);
    const v2 = vector(
      theta,
      r.value - trackWidth.value / 2 - (text ? length : length / 2),
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
      r.value - trackWidth.value / 2 - length - 10,
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
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {showText && (
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
