import React, {memo} from 'react';
import {useAnimatedProps} from 'react-native-reanimated';

import {vector} from '../../utils/worklets';
import {AnimatedLine, AnimatedText} from './Animated';
import {SharedNumber, SharedVector} from '../../types';

export interface MarkProps {
  r: SharedNumber;
  trackWidth: SharedNumber;
  center: SharedVector;
  color: string;
  showText: boolean;
  thickness: number;
  length: number;
  theta: number;
  text?: string;
}

export const Mark = memo(
  ({
    r,
    trackWidth,
    center,
    showText,
    color,
    thickness,
    length,
    theta,
    text,
  }: MarkProps) => {
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
    }, [length]);

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
  },
);
