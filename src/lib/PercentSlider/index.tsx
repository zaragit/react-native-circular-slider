import React from 'react';

import {Percent} from './Percent';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface PercentSliderProps extends Pick<SliderOptions, 'size'> {
  percents: number[];
  thumbColor?: string[];
  filledGaugeColor?: string[];
  onChange?: (percents: number[]) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: Exclude<TickMarkOptions, 'unit' | 'total'>;
}

export function PercentSlider({
  size,
  percents,
  thumbColor = Array.from({length: percents.length}).map(_ => '#FFA500'),
  filledGaugeColor = Array.from({length: percents.length}).map(_ => '#FFE5B4'),
  onChange,
  trackOptions = {},
  tickMarkOptions = {},
}: PercentSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={true}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}>
      <Percent
        percents={percents}
        onChange={onChange}
        thumbColor={thumbColor}
        filledGaugeColor={filledGaugeColor}
      />
    </Slider>
  );
}
