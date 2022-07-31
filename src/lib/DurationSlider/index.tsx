import React from 'react';

import {Duration} from './Duration';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface DurationSliderProps extends SliderOptions {
  duration: {start: number; end: number};
  thumbColor?: {start: string; end: string};
  thumbIcon?: {start: React.ReactNode; end: React.ReactNode};
  filledColor?: string;
  onChange?: (duration: {start: number; end: number}) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
}

export function DurationSlider({
  size,
  clockwise,
  duration,
  thumbColor = {start: '#FFA500', end: '#FFA500'},
  thumbIcon = {start: null, end: null},
  filledColor = '#FFE5B4',
  onChange,
  trackOptions = {},
  tickMarkOptions = {},
}: DurationSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={clockwise}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}
      thumbOptions={{
        colors: [thumbColor.start, thumbColor.end],
        icons: [thumbIcon.start, thumbIcon.end],
      }}>
      <Duration
        duration={duration}
        onChange={onChange}
        filledColor={filledColor}
      />
    </Slider>
  );
}
