import React from 'react';

import {Amount} from './Amount';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface AmountSliderProps extends SliderOptions {
  amount: number;
  pointerColor?: string;
  scaleGaugeColor?: string;
  onChange: (amount: number) => void;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
}

export function AmountSlider({
  size,
  clockwise,
  pointerColor = '#FFA500',
  scaleGaugeColor = '#FFE5B4',
  amount,
  onChange,
  trackOptions = {},
  tickMarkOptions = {},
}: AmountSliderProps) {
  return (
    <Slider
      size={size}
      clockwise={clockwise}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}>
      <Amount
        amount={amount}
        pointerColor={pointerColor}
        scaleGaugeColor={scaleGaugeColor}
        onChange={onChange}
      />
    </Slider>
  );
}
