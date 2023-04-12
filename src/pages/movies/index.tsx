import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import type { Movie } from 'src/models';
import { getMovies } from 'src/the-one-api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import MovieInfo from 'src/components/MovieInfo';
import ListContainer from 'src/components/ListContainer';
import { getMessageFromError } from 'src/utils/error';

interface Props {
  movies: Movie[];
  error?: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const movies = await getMovies();
    return { props: { movies } };
  } catch (err) {
    return { props: { movies: [], error: getMessageFromError(err) } };
  }
};

const Page: NextPage<Props> = ({ movies, error }) => {
  const router = useRouter();
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', (events) => {
      setIsLoadingMovie(true);
    });
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BreadCrumbs crumbs={[{ text: 'Home', link: '/' }]} current="Movies" />
      <Typography
        sx={{ fontSize: '1.5em', padding: '20px', marginTop: '40px' }}
      >
        {isLoadingMovie
          ? 'Loading movie info...'
          : 'Movie adapations of the Lord of the Rings'}
      </Typography>
      {isLoadingMovie && <CircularProgress />}
      {error && <Alert severity="error">Error fetching movies: {error}</Alert>}
      {!isLoadingMovie && (
        <ListContainer>
          {movies.map((movie) => (
            <Card key={movie._id} variant="outlined" sx={{ width: '100%' }}>
              <CardActionArea
                sx={{ padding: '20px' }}
                LinkComponent={NextLink}
                href={`/movies/${movie._id}`}
              >
                <MovieInfo movie={movie} />
              </CardActionArea>
            </Card>
          ))}
        </ListContainer>
      )}
    </Box>
  );
};

export default Page;
