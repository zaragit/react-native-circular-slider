import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import {Circle} from 'react-native-svg';
import {useGaugeContext, useScaleOptionsContext} from '../context/GaugeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface PointerProps {
  color: string;
  theta: Animated.SharedValue<number>;
}

export default function Pointer({color, theta}: PointerProps) {
  const {r, center} = useGaugeContext();
  const {width} = useScaleOptionsContext();

  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: position.value.x,
      cy: position.value.y,
      r: width.value / 2,
    };
  }, [position]);

  return <AnimatedCircle animatedProps={animatedProps} fill={color} />;
}
