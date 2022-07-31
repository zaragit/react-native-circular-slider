import {Vector} from 'react-native-redash';
import {SharedValue} from 'react-native-reanimated';
import React from 'react';

export type RequiredPick<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type SharedNumber = SharedValue<number>;

export type SharedVector = SharedValue<Vector>;

export type GestureThumbs = {
  prev: SharedNumber;
  curr: SharedNumber;
  next: SharedNumber;
};

export type SliderOptions = {
  size: number;
  clockwise?: boolean;
};

export type ThumbOptions = {
  colors?: string[];
  icons?: React.ReactNode[];
};

export type TrackOptions = {
  width?: number;
  color?: string;
};

export type TickMarkOptions = {
  show?: boolean;
  unit?: number;
  total?: number;
  color?: string;
  length?: number;
  thickness?: number;
  showText?: boolean;
  textSize?: number;
  textColor?: string;
};
