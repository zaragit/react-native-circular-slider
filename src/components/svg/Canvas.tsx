import React from 'react';
import {Svg} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

import {useSliderContext} from '../../context/SliderContext';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface CanvasProps {
  children?: React.ReactNode;
}

export function Canvas({children}: CanvasProps) {
  const {size} = useSliderContext();

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
