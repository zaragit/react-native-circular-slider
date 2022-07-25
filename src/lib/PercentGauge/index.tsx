import React, {useCallback} from 'react';
import {PI, TAU} from 'react-native-redash';

import {Percent} from './Percent';
import Gauge, {GaugeProps} from '../Gauge';
import {normalize} from '../../utils/worklets';

export interface PercentGaugeProps extends GaugeProps {
  percents: number[];
  pointerColor?: string[];
  scaleGaugeColor?: string[];
  onChange?: (percents: number[]) => void;
}

export function PercentGauge({
  size,
  scaleOptions = {},
  percents,
  pointerColor = Array.from({length: percents.length}).map(_ => '#FFA500'),
  scaleGaugeColor = Array.from({length: percents.length}).map(_ => '#FFE5B4'),
  onChange,
}: PercentGaugeProps) {
  const percent2Theta = useCallback((percent: number, distance = 0) => {
    'worklet';
    const theta = TAU * (percent / 100);
    return theta + distance;
  }, []);

  const theta2Percent = useCallback((theta: number, start = 0) => {
    'worklet';
    const degrees = normalize(theta - start) * (180 / PI);
    return (degrees / 360) * 100;
  }, []);

  return (
    <Gauge
      {...{
        size,
        scaleOptions,
        toTheta: percent2Theta,
        fromTheta: theta2Percent,
      }}>
      <Percent
        percents={percents}
        onChange={onChange}
        pointerColor={pointerColor}
        scaleGaugeColor={scaleGaugeColor}
      />
    </Gauge>
  );
}
