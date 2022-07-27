import React from 'react';
import {Circle} from 'react-native-svg';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

import {useSliderContext} from '../../context/SliderContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function Track() {
  const {r, center, trackWidth, trackColor} = useSliderContext();

  const animatedProps = useAnimatedProps(() => {
    return {
      r: r.value,
      cx: center.value.x,
      cy: center.value.y,
      strokeWidth: trackWidth.value,
    };
  });

  return <AnimatedCircle animatedProps={animatedProps} stroke={trackColor} />;
}
