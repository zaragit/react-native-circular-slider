import React from 'react';

import {Duration} from './Duration';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface DurationSliderProps extends SliderOptions {
  duration: {start: number; end: number};
  pointerColor?: string;
  scaleGaugeColor?: string;
  onChange: (duration: {start: number; end: number}) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
}

export function DurationSlider({
  size,
  clockwise,
  duration,
  pointerColor = '#FFA500',
  scaleGaugeColor = '#FFE5B4',
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
        pointerColor={pointerColor}
        scaleGaugeColor={scaleGaugeColor}
      />
    </Slider>
  );
}
