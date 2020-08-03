import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProbababilityPage  from './index';

describe('ProbababilityPage ', () => {
  it('renders component layout', () => {
    const layout = shallow(<ProbababilityPage />);

    expect(toJson(layout)).toMatchSnapshot();
  });
});
