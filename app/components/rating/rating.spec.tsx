import React from 'react';
import { render } from '@testing-library/react';
import Rating from './index';

describe('Rating', () => {
  it.each([
    ['3.5 rating', 3.78],
    ['4.5 rating', 4.59],
    ['5 rating', 5],
    ['1.5 rating', 1.76],
    ['4 rating', 4.75],
  ]  as [string, number][])('should render rating value width icons depicting %s', (name, value) => {
    const { container } = render(<Rating {...{value: 3.5}} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the correct number of icons', () => {
    const { container } = render(<Rating {...{value: 3.5, maxCount: 20}} />);
    const $icons = container.querySelectorAll('svg')
    expect($icons).not.toBeNull()
    expect($icons).toHaveLength(20)
  })

  describe('When value exceeds maxCount', () => {
    it('should throw an error', () => {
      expect(() => render(<Rating {...{value: 10.8, maxCount: 10}} />)).toThrowError('value cannot be more than maxCount')
    })
  })
});
