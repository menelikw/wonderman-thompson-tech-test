import React from 'react';
import FilterMenu from '.';

const data = [
  {
    category: 'Category 1',
    items: ['item 1', 'item 2', 'item 3'],
    collapseItems: false,
  },
  {
    category: 'Category 2',
    items: ['label 1', 'label 2', 'label 3', 'label 4', 'label 5', 'label 6'],
    collapseItems: true,
  },
];

export default {
  component: FilterMenu,
  title: 'Filter Menu',
};

export const ThisIsHowIWork = () => {
  return <FilterMenu data={data} />;
};
