import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import {useGaugeContext, useScaleOptionsContext} from '../context/GaugeContext';

interface Props {
  prevTheta?: SharedValue<number>;
  currentTheta: SharedValue<number>;
  nextTheta?: SharedValue<number>;
  gestureTarget: SharedValue<{
    prevTheta?: SharedValue<number>;
    currentTheta: SharedValue<number>;
    nextTheta?: SharedValue<number>;
  } | null>;
}

function Gesture({prevTheta, currentTheta, nextTheta, gestureTarget}: Props) {
  const {r, center} = useGaugeContext();
  const {width} = useScaleOptionsContext();

  const endPosition = useDerivedValue(
    () =>
      polar2Canvas({theta: currentTheta.value, radius: r.value}, center.value),
    [currentTheta],
  );

  return (
    <Pressable
      onPressIn={() => {
        gestureTarget.value = {
          prevTheta,
          currentTheta,
          nextTheta,
        };
      }}>
      <Animated.View
        style={useAnimatedStyle(() => ({
          position: 'absolute',
          width: width.value,
          height: width.value,
          left: endPosition.value.x - width.value / 2,
          top: endPosition.value.y - width.value / 2,
        }))}
      />
    </Pressable>
  );
}

export default Gesture;
