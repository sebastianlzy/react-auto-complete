import React from 'react'
import { mount, shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecommendedItems from './RecommendedItems.jsx'

configure({ adapter: new Adapter() });

test('should be init with default state', () => {
  const recommendedItems = shallow(
    <RecommendedItems
      items={[{fullName: 'fullName', description: 'description'}]}
      onClick={() => {}}
      onMouseOver={() => {}}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />
  );

  expect(recommendedItems.find('.recommended-item').length).toEqual(1);
});
