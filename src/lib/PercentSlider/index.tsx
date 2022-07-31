import React from 'react';

import {Percent} from './Percent';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface PercentSliderProps extends Pick<SliderOptions, 'size'> {
  percents: number[];
  thumbColor?: string[];
  thumbIcon?: React.ReactNode[];
  filledColor?: string[];
  onChange?: (percents: number[]) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: Exclude<TickMarkOptions, 'unit' | 'total'>;
}

export function PercentSlider({
  size,
  percents,
  thumbColor = new Array(percents.length).fill('#FFA500'),
  thumbIcon = new Array(percents.length).fill(null),
  filledColor = new Array(percents.length).fill('#FFE5B4'),
  onChange,
  trackOptions = {},
  tickMarkOptions = {},
}: PercentSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={true}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}
      thumbOptions={{colors: thumbColor, icons: thumbIcon}}>
      <Percent
        percents={percents}
        onChange={onChange}
        filledColor={filledColor}
      />
    </Slider>
  );
}
