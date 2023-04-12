import type { GetServerSideProps } from 'next';
import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import type { Movie, Quote } from 'src/models';
import { getMovie, getMovieQuotes } from 'src/api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import MovieInfo from 'src/components/MovieInfo';
import QuoteInfo from 'src/components/MovieQuotes';
import ListContainer from 'src/components/ListContainer';

type Props = {
  movie: Movie;
  quotes: Quote[];
  error?: boolean;
};

const emptyMovie: Movie = {
  _id: '',
  name: '',
  runtimeInMinutes: 0,
  budgetInMillions: 0,
  boxOfficeRevenueInMillions: 0,
  academyAwardNominations: 0,
  academyAwardWins: 0,
  rottenTomatoesScore: 0,
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const movieId = context.query.id as string;

  try {
    const movie = await getMovie(movieId);
    const quotes = await getMovieQuotes(movieId);

    return { props: { movie, quotes } };
  } catch {
    return { props: { error: true, movie: emptyMovie, quotes: [] } };
  }
};

const Movie: FunctionComponent<Props> = ({ movie, quotes, error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BreadCrumbs
          crumbs={[
            { text: 'Home', link: '/' },
            { text: 'Movies', link: '/movies' },
          ]}
          current={movie.name}
        />

        <Box
          sx={{
            marginTop: '40px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error ? (
            <Alert severity="error">Error fetching movie info</Alert>
          ) : (
            <>
              <MovieInfo movie={movie} />
              <Box
                sx={{
                  marginTop: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {quotes.length === 0 ? (
                  <Alert severity="info">No quotes to display</Alert>
                ) : (
                  <>
                    <Typography sx={{ fontSize: '18px', marginBottom: '8px' }}>
                      Quotes
                    </Typography>
                    <ListContainer
                      sx={{
                        width: '100%',
                      }}
                    >
                      {quotes.map((quote) => (
                        <Card
                          key={quote._id}
                          variant="outlined"
                          sx={{ width: '100%' }}
                        >
                          <QuoteInfo quote={quote} />
                        </Card>
                      ))}
                    </ListContainer>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
