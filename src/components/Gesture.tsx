import React from 'react';
import {Vector} from 'react-native-redash';
import {StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {GestureThumbs} from '../types';

export type GestureContext = {
  offset: number;
  target: SharedValue<GestureThumbs | null>;
};

export interface GestureProps {
  onStart?: (vector: Vector, context: GestureContext) => void;
  onActive?: (vector: Vector, context: GestureContext) => void;
  onEnd?: (vector: Vector, context: GestureContext) => void;
  children?: React.ReactNode;
}

export default function Gesture({
  onStart,
  onActive,
  onEnd,
  children,
}: GestureProps) {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart,
    onActive,
    onEnd,
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
    </PanGestureHandler>
  );
}
