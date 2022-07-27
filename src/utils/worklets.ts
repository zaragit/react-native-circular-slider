import {PI, polar2Canvas, TAU, Vector} from 'react-native-redash';

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

export const percent2Theta = (percent: number, distance = 0) => {
  'worklet';
  const theta = TAU * (percent / 100);
  return theta + distance;
};

export const theta2Percent = (theta: number, start = 0) => {
  'worklet';
  const degrees = normalize(theta - start) * (180 / PI);
  return (degrees / 360) * 100;
};

export const amount2Theta = (
  amount: number,
  total: number,
  clockwise: boolean,
) => {
  'worklet';
  const percent = (amount / total) * 100;
  const theta = (TAU * percent) / 100;
  return setClockwise(theta, clockwise);
};

export const theta2Amount = (
  theta: number,
  total: number,
  clockwise: boolean,
) => {
  'worklet';
  const percent = (normalize(theta - 0.5 * PI) * 100) / TAU;
  const scale = (percent / 100) * total;
  return clockwise ? total - scale : scale;
};

export const vector = (theta: number, radius: number, center: Vector) => {
  'worklet';
  return polar2Canvas(
    {
      theta,
      radius,
    },
    center,
  );
};

export const moveable = (start: number, end: number, current: number) => {
  'worklet';
  return start > end
    ? current > start || end > current
    : current < end && current >= start;
};
