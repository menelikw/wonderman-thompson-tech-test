import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Button } from '@mono-nx-test-with-nextjs/ui';
import { FilterItem } from '@mono-nx-test-with-nextjs/fe-wtc-tech-test';

const useStyles = makeStyles((theme) =>
  createStyles({
    filterMenu: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    paper: {
      borderRadius: '20px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      padding: '13px 0 5px',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'min(232px) auto',
      columnGap: '25px',
    },
    resetFilters: {
      display: 'flex',
      color: theme.palette.common.black,
      fontWeight: 'bold',
      fontSize: '1rem',
      backgroundColor: theme.palette.common.white,
      margin: '0 auto 20px',
      borderRadius: '10px',
      minWidth: '200px',
    },
  })
);

export type MenuData = {
  category: string;
  items: string[];
  collapseItems: boolean;
};

export type CollapsedIdsObj = {
  [category: string]: boolean;
};

export const FilterMenu = ({
  data = [],
  onChange = null,
}: {
  data: MenuData[];
  onChange: (list: CollapsedIdsObj) => void;
}) => {
  const [checkedBoxesList, setCheckedBoxesListSetList] = useState<
    CollapsedIdsObj
  >({});

  const handleOnChange = (newCheckboxState, id) => {
    const newState = { ...checkedBoxesList, [id]: newCheckboxState };
    setCheckedBoxesListSetList(newState);
    onChange(newState);
  };

  const handleReset = () => setCheckedBoxesListSetList({});

  const classes = useStyles();
  return (
    <div className={classes.filterMenu}>
      <div className={classes.cardsContainer}>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            className={classes.resetFilters}
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <FilterItem
            data={data}
            onChange={handleOnChange}
            checkedList={checkedBoxesList}
          />
        </Paper>
      </div>
    </div>
  );
};

export default FilterMenu;
