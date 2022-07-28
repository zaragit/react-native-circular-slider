import React from 'react';

import {Duration} from './Duration';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface DurationSliderProps extends SliderOptions {
  duration: {start: number; end: number};
  thumbColor?: string;
  filledGaugeColor?: string;
  onChange: (duration: {start: number; end: number}) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
}

export function DurationSlider({
  size,
  clockwise,
  duration,
  thumbColor = '#FFA500',
  filledGaugeColor = '#FFE5B4',
  onChange,
  trackOptions = {},
  tickMarkOptions = {},
}: DurationSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={clockwise}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}>
      <Duration
        duration={duration}
        onChange={onChange}
        thumbColor={thumbColor}
        filledGaugeColor={filledGaugeColor}
      />
    </Slider>
  );
}
