import React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Circle} from 'react-native-svg';
import {useGaugeContext} from '../context/GaugeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Ring() {
  const {r, center, scaleOptions} = useGaugeContext();
  const {width, color} = scaleOptions;

  const animatedProps = useAnimatedProps(() => {
    return {
      r: r.value,
      cx: center.value.x,
      cy: center.value.y,
      strokeWidth: width.value,
    };
  });

  return <AnimatedCircle animatedProps={animatedProps} stroke={color} />;
}
