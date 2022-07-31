import React from 'react';

import {Amount} from './Amount';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface AmountSliderProps extends SliderOptions {
  amount: number;
  thumbColor?: string;
  filledColor?: string;
  onChange?: (amount: number) => void;
  thumbIcon?: React.ReactNode;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
}

export function AmountSlider({
  size,
  clockwise,
  thumbColor = '#FFA500',
  filledColor = '#FFE5B4',
  amount,
  onChange,
  thumbIcon,
  trackOptions = {},
  tickMarkOptions = {},
}: AmountSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={clockwise}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}
      thumbOptions={{colors: ['#FFA500'], icons: [thumbIcon]}}>
      <Amount
        amount={amount}
        thumbColor={thumbColor}
        filledColor={filledColor}
        onChange={onChange}
      />
    </Slider>
  );
}
