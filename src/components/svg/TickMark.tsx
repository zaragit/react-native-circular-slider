import React, {memo, useEffect, useState} from 'react';
import {TAU} from 'react-native-redash';

import {Mark} from './Mark';
import {
  useSliderContext,
  useTickMarkContext,
} from '../../context/SliderContext';
import {setClockwise} from '../../utils/worklets';

function _TickMark() {
  const {clockwise} = useSliderContext();
  const {total, unit} = useTickMarkContext();

  const [length, setLength] = useState(total);

  useEffect(() => {
    setLength(total);
  }, [total]);

  return (
    <>
      {Array.from({length}).map((_, i) => {
        const theta = setClockwise((i * TAU) / total, clockwise);
        const isLong = i % unit === 0;
        return (
          <Mark key={i} theta={theta} text={isLong ? String(i) : undefined} />
        );
      })}
    </>
  );
}

export const TickMark = memo(_TickMark);
