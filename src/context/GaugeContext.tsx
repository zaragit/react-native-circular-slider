import React, {createContext, useContext} from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Vector} from 'react-native-redash';

import {GaugeProps} from '../lib/Gauge';

export interface GaugeContext {
  size: SharedValue<number>;
  r: SharedValue<number>;
  center: SharedValue<Vector>;
  scaleOptions: {
    unit: number;
    total: number;
    clockwise: boolean;
    color: string;
    width: SharedValue<number>;
    showLine: boolean;
    lineColor: string;
    lineWidth: number;
    lineLength: number;
    showText: boolean;
    textSize: number;
    textColor: string;
  };
}

const GaugeContext = createContext<GaugeContext | null>(null);

export interface GaugeContextProviderProps extends GaugeProps {
  toTheta?: (value: number) => number;
  fromTheta?: (theta: number) => number;
  children?: React.ReactNode;
}

export default function GaugeContextProvider({
  size,
  scaleOptions = {},
  children,
}: GaugeContextProviderProps) {
  const {
    unit = 5,
    total = 100,
    clockwise = true,
    color = '#7F8487',
    width = size * 0.1,
    showLine = false,
    lineColor = '#7F8487',
    lineWidth = 2,
    lineLength = 10,
    showText = false,
    textSize = 10,
    textColor = '#191919',
  } = scaleOptions;

  const derivedSize = useDerivedValue(() => size, [size]);
  const derivedScaleWidth = useDerivedValue(
    () => width || derivedSize.value * 0.1,
    [width],
  );
  const derivedR = useDerivedValue(
    () => (derivedSize.value - derivedScaleWidth.value) / 2,
  );
  const derivedCenter = useDerivedValue(() => ({
    x: derivedSize.value / 2,
    y: derivedSize.value / 2,
  }));

  return (
    <GaugeContext.Provider
      value={{
        size: derivedSize,
        r: derivedR,
        center: derivedCenter,
        scaleOptions: {
          unit,
          total,
          clockwise,
          color,
          width: derivedScaleWidth,
          showLine,
          lineColor,
          lineWidth,
          lineLength,
          showText,
          textSize,
          textColor,
        },
      }}>
      {children}
    </GaugeContext.Provider>
  );
}

export function useGaugeContext() {
  const context = useContext(GaugeContext);

  if (!context) {
    throw new Error('GaugeContext.Provider is not found.');
  }

  return context;
}

export function useScaleOptionsContext() {
  const context = useGaugeContext();
  return context.scaleOptions;
}
