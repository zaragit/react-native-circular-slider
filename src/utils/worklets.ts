import {PI, TAU, Vector} from 'react-native-redash';

export const normalize = (theta: number) => {
  'worklet';
  const rest = theta % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const setClockwise = (theta: number, clockwise = true) => {
  'worklet';
  return normalize((clockwise ? -theta : theta) + 0.5 * PI);
};

export const thetaBetweenStartAndEnd = (start: number, end: number) => {
  'worklet';
  return start > end ? end + (TAU - start) : end - start;
};

export const containedInSquare = (
  value: Vector,
  center: Vector,
  side: number,
) => {
  'worklet';
  const topLeft = {x: center.x - side / 2, y: center.y - side / 2};
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};
