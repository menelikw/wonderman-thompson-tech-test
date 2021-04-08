import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  MenuList,
  MenuItem,
  Typography,
  Collapse,
} from '@material-ui/core';
import { Toggle } from '@mono-nx-test-with-nextjs/ui';
import {
  MenuData,
  CollapsedIdsObj,
} from '@mono-nx-test-with-nextjs/fe-wtc-tech-test';
import CheckboxIcon from './checkboxIcon';
import SeeMore from './seeMore';

const useStyles = makeStyles((theme) =>
  createStyles({
    filterItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    menuItem: {
      padding: '0 0 0 25px',
    },
    menuLabel: {
      padding: '0 20px 4px',
    },
    menuList: {
      padding: '0 0 2px',
    },
    category: {
      fontWeight: 'bold',
    },
  })
);

export const FilterItem = ({
  data = [],
  checkedList = {},
  onChange = null,
}: {
  data: MenuData[];
  checkedList: CollapsedIdsObj;
  onChange: (newState: boolean, id: string) => void;
}) => {
  const [collapsedIds, setCollapsedId] = useState<CollapsedIdsObj>({});
  const classes = useStyles();
  const handleSeeMoreToggle = (newState, id) => {
    setCollapsedId({ ...collapsedIds, [id]: newState });
  };

  const menuItems = Array.isArray(data) ? data : [data];

  return (
    <>
      {menuItems.map(({ category, items, collapseItems }) => (
        <div key={category}>
          <Typography
            variant="body1"
            component="h6"
            className={`${classes.menuLabel} ${classes.category}`}
          >
            {category}
          </Typography>
          <Collapse in={collapsedIds[category]} collapsedHeight={75}>
            <MenuList className={classes.menuList}>
              {items.map((label) => {
                return (
                  <MenuItem
                    className={classes.menuItem}
                    key={`${category}${label}`}
                  >
                    <FormControlLabel
                      control={
                        <Toggle
                          onChange={onChange}
                          id={label}
                          reset={Object.keys(checkedList).length === 0}
                        >
                          <CheckboxIcon checked={checkedList[label] || false} />
                        </Toggle>
                      }
                      label={label}
                    />
                  </MenuItem>
                );
              })}
            </MenuList>
          </Collapse>
          <Toggle onChange={handleSeeMoreToggle} id={category}>
            {collapseItems && <SeeMore open={collapsedIds[category]} />}
          </Toggle>
        </div>
      ))}
    </>
  );
};

export default FilterItem;
