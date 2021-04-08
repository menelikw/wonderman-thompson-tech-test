import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ExpandMoreIcon, ExpandLessIcon } from '@mono-nx-test-with-nextjs/ui';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '5px 0 13px 20px',
      cursor: 'pointer',
    },
  })
);

const SeeMore = ({ open = false }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.container}`}>
      {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      <Typography>See more</Typography>
    </div>
  );
};

export default SeeMore;
