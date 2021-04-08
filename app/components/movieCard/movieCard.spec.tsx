import React from 'react';
import { render } from '@testing-library/react';
import MovieCard, { MovieCardProps } from './index';

const defaultProps: MovieCardProps = {
  id: '123',
  title: 'test',
  imgSrc: 'test.png',
  rating: { value: 1 },
  isSaved: false,
  isWatched: false,
  onMarkWatched: jest.fn,
  onSave: jest.fn
}

describe('MovieCard', () => {
  describe.each([
    ['not watched and saved', {isWatched: false, isSaved: true}, 'rgb(237, 102, 6)'],
    ['watched and not saved', {isWatched: true, isSaved: false}, 'rgb(238, 201, 7)'],
    ['watched and saved', {isWatched: true, isSaved: true}, 'rgb(4, 148, 82)'],
    ['not watched and not saved', {isWatched: false, isSaved: false}, 'rgb(255, 255, 255)']
  ])('When %s', (name, props, color) => {

    let rendered
    beforeEach(() => rendered = render(<MovieCard {...{...defaultProps}} />))

    it('should render appropriate state color', () => {
      rendered.rerender(<MovieCard {...{...defaultProps, ...props}} />)
      const $component = rendered.getByTestId('movieCardComponent')
      expect(window.getComputedStyle($component).getPropertyValue('background-color')).toBe(color)
    })
  })
});
