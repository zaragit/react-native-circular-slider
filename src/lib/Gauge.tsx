import React from 'react';
import {StyleSheet, View} from 'react-native';
import GaugeContextProvider from '../context/GaugeContext';

export interface ScaleOptions {
  unit?: number;
  total?: number;
  clockwise?: boolean;
  color?: string;
  width?: number;
  showLine?: boolean;
  lineColor?: string;
  lineWidth?: number;
  lineLength?: number;
  showText?: boolean;
  textSize?: number;
  textColor?: string;
}

export interface GaugeProps {
  size: number;
  scaleOptions?: ScaleOptions;
  children?: React.ReactNode;
}

export default function Gauge({size, scaleOptions, children}: GaugeProps) {
  return (
    <GaugeContextProvider
      {...{
        size,
        scaleOptions,
      }}>
      <View style={[styles.container, {width: size, height: size}]}>
        {children}
      </View>
    </GaugeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
