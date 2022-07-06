import React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Vector} from 'react-native-redash';
import {Circle} from 'react-native-svg';
import {useScalePropsContext} from '../context/GaugeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface PointerProps {
  color: string;
  position: Animated.SharedValue<Vector>;
}

export default function Pointer({color, position}: PointerProps) {
  const {width} = useScalePropsContext();

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: position.value.x,
      cy: position.value.y,
      r: width.value / 2,
    };
  }, [position]);

  return <AnimatedCircle animatedProps={animatedProps} fill={color} />;
}
