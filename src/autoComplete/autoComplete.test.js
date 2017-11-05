import React from 'react'
import { mount, shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AutoComplete from './AutoComplete.jsx'

configure({ adapter: new Adapter() });

test('should be init with default state', () => {
  const autocompleteWrapper = shallow(<AutoComplete />);

  expect(autocompleteWrapper.find('.auto-complete').length).toEqual(1);
  expect(autocompleteWrapper.state()).toEqual({
    searchValue: '',
    recommendedItems: [],
    selectedIdx: -1,
    isRecommendationShown: false,
    isBlurIgnore: false,
  });
});
