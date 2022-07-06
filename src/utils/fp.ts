import {PI, TAU} from 'react-native-redash';

export const normalize = (theta: number) => {
  'worklet';
  const rest = theta % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const setClockwise = (theta: number, clockwise = true) => {
  'worklet';
  return normalize((clockwise ? -theta : theta) + 0.5 * PI);
};
