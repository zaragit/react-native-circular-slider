import React, {useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {canvas2Polar, Vector} from 'react-native-redash';

import CursorOverlay from './CursorOverlay';
import {GestureThumbs, SharedNumber} from '../types';
import {Canvas, TickMark, Track} from '../components/svg';
import RGesture, {GestureContext} from '../components/Gesture';
import {useSliderContext, useTickMarkContext} from '../context/SliderContext';

export interface ContainerProps {
  thetas: SharedNumber[];
  onGestureActive?: (vector: Vector, context: GestureContext) => void;
  onGestureEnd?: (vector: Vector, context: GestureContext) => void;
  children?: React.ReactNode;
}

export function Container({
  thetas,
  onGestureActive,
  onGestureEnd,
  children,
}: ContainerProps) {
  const {size, r, center, clockwise, trackWidth} = useSliderContext();
  const {show, total, unit, color, showText, thickness, length} =
    useTickMarkContext();

  const target = useSharedValue<GestureThumbs | null>(null);

  const onGestureStart = useCallback(
    ({x, y}: Vector, context: GestureContext) => {
      'worklet';
      const {theta} = canvas2Polar({x, y}, center.value);
      context.offset = theta;
      context.target = target;
    },
    [center.value, target],
  );

  const _onGestureEnd = useCallback(
    (vector: Vector, context: GestureContext) => {
      'worklet';
      target.value = null;

      if (onGestureEnd) {
        onGestureEnd(vector, context);
      }
    },
    [onGestureEnd, target],
  );

  return (
    <>
      <Canvas size={size}>
        <Track />
        {show && (
          <TickMark
            {...{
              r,
              center,
              clockwise,
              trackWidth,
              total,
              unit,
              color,
              showText,
              thickness,
              length,
            }}
          />
        )}
        {children}
      </Canvas>
      <RGesture
        onStart={onGestureStart}
        onActive={onGestureActive}
        onEnd={_onGestureEnd}>
        {thetas.reduce((acc, curr, index, arr) => {
          const prev = arr[index - 1] || arr[arr.length - 1];
          const next = arr[index + 1] || arr[0];

          acc.push(
            <CursorOverlay
              key={index}
              theta={curr}
              onPressIn={() =>
                (target.value = {
                  prev,
                  curr,
                  next,
                })
              }
            />,
          );
          return acc;
        }, [] as React.ReactNode[])}
      </RGesture>
    </>
  );
}
