import 'react-native';
import React from 'react';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {render} from '@testing-library/react-native';
import FilledGauge from '../src/components/FilledGauge';
import GaugeContextProvider from '../src/context/GaugeContext';
import {PI, polar2Canvas} from 'react-native-redash';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

describe('<FilledGauge/>', () => {
  test('initialize', () => {
    const startTheta = useSharedValue(0);
    const endTheta = useSharedValue(1.5 * PI);
    const startPosition = useDerivedValue(() =>
      polar2Canvas({theta: startTheta.value, radius: 50}, {x: 50, y: 50}),
    );
    const endPosition = useDerivedValue(() =>
      polar2Canvas({theta: endTheta.value, radius: 50}, {x: 50, y: 50}),
    );

    const {container} = render(
      <GaugeContextProvider size={100}>
        <FilledGauge
          color={''}
          startTheta={startTheta}
          endTheta={endTheta}
          startPosition={startPosition}
          endPosition={endPosition}
        />
        ,
      </GaugeContextProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
