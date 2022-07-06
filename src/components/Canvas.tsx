import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Svg} from 'react-native-svg';
import {useGaugeContext} from '../context/GaugeContext';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface CanvasProps {
  children?: React.ReactNode;
}

export default function Canvas({children}: CanvasProps) {
  const {size} = useGaugeContext();

  const animatedProps = useAnimatedProps(() => {
    return {
      width: size.value,
      height: size.value,
    };
  });

  return (
    <AnimatedSvg animatedProps={animatedProps} style={StyleSheet.absoluteFill}>
      {children}
    </AnimatedSvg>
  );
}
