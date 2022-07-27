import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {Circle} from 'react-native-svg';
import {polar2Canvas} from 'react-native-redash';

import {SharedNumber} from '../../types';
import {useSliderContext} from '../../context/SliderContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface ThumbProps {
  color: string;
  theta: SharedNumber;
}

export function Thumb({color, theta}: ThumbProps) {
  const {r, center, trackWidth} = useSliderContext();

  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: position.value.x,
      cy: position.value.y,
      r: trackWidth.value / 2,
    };
  }, [position]);

  return <AnimatedCircle animatedProps={animatedProps} fill={color} />;
}
