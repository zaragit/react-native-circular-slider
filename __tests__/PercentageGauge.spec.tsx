import 'react-native';
import React from 'react';
import ChainGauge from '../src/lib/ChainGauge';

import renderer from 'react-test-renderer';

describe('Percentage', () => {
  it('renders correctly', () => {
    renderer.create(<ChainGauge />);
  });
});
