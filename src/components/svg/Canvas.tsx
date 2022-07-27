import React, {memo} from 'react';
import {Svg} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

import {SharedNumber} from '../../types';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface CanvasProps {
  size: SharedNumber;
  children?: React.ReactNode;
}

export const Canvas = memo(({size, children}: CanvasProps) => {
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
});
