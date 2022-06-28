import 'react-native';
import React from 'react';
import ChainGauge from '../src/lib/ChainGauge';

import renderer from 'react-test-renderer';

describe('Chain', () => {
  it('renders correctly', () => {
    renderer.create(<ChainGauge />);
  });
});
