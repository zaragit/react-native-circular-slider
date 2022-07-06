import React from 'react';
import {StyleSheet, View} from 'react-native';
import GaugeContextProvider from '../context/GaugeContext';

export interface ScaleProps {
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
  scaleProps?: ScaleProps;
  children?: React.ReactNode;
}

export default function Gauge({size, scaleProps, children}: GaugeProps) {
  return (
    <GaugeContextProvider
      {...{
        size,
        scaleProps,
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
