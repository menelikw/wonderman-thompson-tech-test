import React, { useEffect, useState } from 'react';
import { StarBorderIcon, StarIcon, StarHalfIcon } from '@mono-nx-test-with-nextjs/ui';

export interface RatingProps {
  value: number
  maxCount?: number
}

export const Rating = (props: RatingProps) => {
  const {value, maxCount = 5} = props
  if (value > maxCount) throw new Error(`value cannot be more than maxCount`)

  const [icons, setIcons] = useState<JSX.Element[]>([])
  const roundedValue = Math.floor(value * 2) / 2

  useEffect(() => {
    let _roundedValue = roundedValue

    const _icons = Array(maxCount).fill('').map((icon, index) => {
      if (_roundedValue > 0.5) {
        _roundedValue--
        return <StarIcon key={index} />
      }
      if (_roundedValue === 0.5) {
        _roundedValue = 0
        return <StarHalfIcon key={index} />
      }
      return <StarBorderIcon key={index} />
    })


    setIcons(_icons)
  }, [value, maxCount])

  return (
    <>
      <b>({value})</b>
      <div aria-label={`${roundedValue} stars out of ${maxCount}`}>{icons.map(icon => icon)}</div>
    </>
  );
}

export default Rating;
