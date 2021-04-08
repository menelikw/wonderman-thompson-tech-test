import React, { useEffect, useState } from 'react';
import MovieCard, { MovieCardProps } from '../app/components/movieCard';
import { v4 as uuid } from 'uuid';
import { Grid } from '@mono-nx-test-with-nextjs/ui';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    pageTitle: {
      textAlign: 'center'
    },
    grid: {
      margin: '0 auto'
    },
    noItems: {
      textAlign: 'center',
      fontSize: 30,
      padding: 200,
      margin: 'auto'
    },
    gridItem: {
      display: 'flex',
      justify: 'center'
    },
    oldSkoolMarquee: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  })
);

const Home = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3333/api/movies')
        const data = await response.json()
        const movies = data.map(item => ({
          id: uuid(),
          title: item.Title,
          imgSrc: item.Poster,
          isSaved: /true/i.test(item.Watched),
          isWatched: /true/i.test(item.Saved),
          rating: {value: getAverageRating(item.Ratings.map(rating => rating.Value))}
        }))
        setMovies(movies)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const getAverageRating = (values: string[]) => {
    const ratingValues = values.map(value => {
      // If rating is out of 10 move decimal point up 1 place
      if (value.indexOf('/') && value.split('/')[1] === '10') return parseFloat(value) * 10
      return parseFloat(value)
    })

    const sum = ratingValues.reduce((acc, curr) => acc + curr, 0)
    const averagePercent = sum / ratingValues.length

    // Return decimal rating
    return parseFloat((averagePercent * 5 / 100).toFixed(2))
  }

  const [movies, setMovies] = useState<MovieCardProps[]>([])

  const setItemAsWatched = (id: string) => setMovies(movies.map(movie => {
    if (movie.id === id) movie.isWatched = !movie.isWatched
    return movie
  }))

  const saveItem = (id: string) => setMovies(movies.map(movie => {
    if (movie.id === id) movie.isSaved = !movie.isSaved
    return movie
  }))

  return (
    <main>
      {/*loool*/}
      {isLoading ? <marquee className={classes.oldSkoolMarquee}>Loading...</marquee> : null}
      {movies?.length ? <h2 className={classes.pageTitle}>Movies ({movies.length})</h2> : null}

      <Grid className={classes.grid} item xs={12} sm={7} lg={9}>
        <Grid container spacing={5} aria-live="polite">
          {!isLoading && !movies?.length ? <h2 className={classes.noItems}>Ah sugar flakes! No movies...<br/>Maybe just go to bed! 🤷‍</h2> : null}
          {movies?.map(movie => (
            <Grid className={classes.gridItem} item xs={12} sm={6} lg={3} key={movie.id} justify={'center'}>
              <MovieCard {...{ ...movie, onMarkWatched: setItemAsWatched, onSave: saveItem, key: movie.id }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
