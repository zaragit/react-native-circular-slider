import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {Vector} from 'react-native-redash';
import React from 'react';

import {useScalePropsContext} from '../context/GaugeContext';

interface CursorOverlayProps {
  position: SharedValue<Vector>;
}

const CursorOverlay = ({position}: CursorOverlayProps) => {
  const {width} = useScalePropsContext();

  const style = useAnimatedStyle(() => {
    const {x, y} = position.value;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width.value,
      height: width.value,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        {translateX: x - width.value / 2},
        {translateY: y - width.value / 2},
      ],
    };
  }, [position]);

  return <Animated.View style={style}></Animated.View>;
};

export default CursorOverlay;
