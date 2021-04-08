import React, { useState } from 'react';
import FilterItem from '.';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  component: FilterItem,
  title: 'Filter Item',
};

export const ThisIsHowIWork = () => {
  const [checkedBoxesList, setCheckedBoxesListSetList] = useState({});

  const handleOnChange = (newState, id) =>
    setCheckedBoxesListSetList({ ...checkedBoxesList, [id]: newState });

  return (
    <>
      <CssBaseline />
      <FilterItem
        data={data}
        onChange={handleOnChange}
        checkedList={checkedBoxesList}
      />
    </>
  );
};
