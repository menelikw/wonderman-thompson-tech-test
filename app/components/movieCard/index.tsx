import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, VisibilityIcon, VisibilityOffIcon, FavoriteIcon, FavoriteBorderIcon } from '@mono-nx-test-with-nextjs/ui';
import Rating, { RatingProps } from '../rating';

export interface MovieCardProps {
  id: string,
  title: string,
  imgSrc: string,
  rating: RatingProps,
  isSaved: boolean,
  isWatched: boolean,
  onMarkWatched: (id: string) => void,
  onSave: (id: string) => void
}

const getBackgroundColor = (isWatched, isSaved) => {
  // TODO: Derive colours from theme
  if (!isWatched && isSaved) return '#ED6606'
  if (isWatched && !isSaved) return '#EEC907'
  if (isWatched && isSaved) return '#049452'
  return '#FFF'
}

//TODO: Move to separate file
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
      width: 200,
      height: 300,
      borderRadius: 20,
      backgroundColor: (props: MovieCardProps) => getBackgroundColor(props.isWatched, props.isSaved)
    },
    buttonContainer: {
      paddingTop: 5,
      display: 'flex',
      justifyContent: 'space-between'
    },
    button: {
      cursor: 'pointer',
      border: 'none',
      background: 'none'
    },
    imageContainer: {
      width: 150,
      height: 221,
      margin: 'auto',
      borderRadius: 10,
      overflow: 'hidden'
    },
    count: {
      textAlign: 'center'
    },
    image: {
      maxWidth: '100%'
    }
  })
);


export const MovieCard = props => {
  const {title, imgSrc, isSaved, isWatched, id, rating } = props
  const classes = useStyles(props)

  return (
      <Paper elevation={3} classes={{root: classes.root}} data-testid={'movieCardComponent'}>
        <div className={classes.buttonContainer}>
          <button
            role="switch"
            aria-checked={isWatched}
            className={classes.button}
            onClick={() => props.onMarkWatched(id)}>{isWatched ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
          <button
            role="switch"
            aria-checked={isSaved}
            className={classes.button}
            onClick={() => props.onSave(id)}>{isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}</button>
        </div>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              alt={`"${title}" movie poster`}
              src={imgSrc}
              loading={'lazy'}
              onError={e => e.currentTarget.src = '/assets/no-image.png'} />
          </div>

        <Rating {...rating} />
      </Paper>
  );
}

export default MovieCard;
