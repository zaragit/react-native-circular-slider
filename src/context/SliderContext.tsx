import React, {createContext, useContext} from 'react';
import {useDerivedValue} from 'react-native-reanimated';

import {
  SharedNumber,
  SharedVector,
  SliderOptions,
  TickMarkOptions,
  TrackOptions,
} from '../types';

interface SliderContext {
  size: SharedNumber;
  r: SharedNumber;
  center: SharedVector;
  trackWidth: SharedNumber;
  trackColor: string;
  clockwise: boolean;
  tickMarkOptions: Required<TickMarkOptions>;
}

const SliderContext = createContext<SliderContext | null>(null);

export interface SliderContextProviderProps {
  sliderOptions: Required<SliderOptions>;
  trackOptions: Required<TrackOptions>;
  tickMarkOptions: Required<TickMarkOptions>;
  children?: React.ReactNode;
}

export default function SliderContextProvider({
  sliderOptions,
  trackOptions,
  tickMarkOptions,
  children,
}: SliderContextProviderProps) {
  const {size, clockwise} = sliderOptions;
  const {width, color} = trackOptions;
  const derivedTickMarkOptions = useDerivedValue(
    () => tickMarkOptions,
    [tickMarkOptions],
  );

  const derivedSize = useDerivedValue(() => size, [size]);
  const derivedTrackWidth = useDerivedValue(
    () => width || derivedSize.value * 0.1,
    [width],
  );
  const derivedR = useDerivedValue(
    () => (derivedSize.value - derivedTrackWidth.value) / 2,
  );
  const derivedCenter = useDerivedValue(() => ({
    x: derivedSize.value / 2,
    y: derivedSize.value / 2,
  }));

  return (
    <SliderContext.Provider
      value={{
        size: derivedSize,
        r: derivedR,
        clockwise,
        center: derivedCenter,
        trackWidth: derivedTrackWidth,
        trackColor: color,
        tickMarkOptions: derivedTickMarkOptions.value,
      }}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('SliderContext.Provider is not found.');
  }
  return context;
}

export function useTickMarkContext() {
  const context = useSliderContext();
  return context.tickMarkOptions;
}
