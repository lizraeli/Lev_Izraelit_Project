import type { GetStaticPaths, GetStaticProps } from 'next';
import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import type { Movie, Quote } from 'src/models';
import { getMovie, getMovies, getMovieQuotes } from 'src/the-one-api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import MovieInfo from 'src/components/MovieInfo';
import QuoteInfo from 'src/components/QuoteInfo';
import ListContainer from 'src/components/ListContainer';
import { usePaginationRange } from 'src/hooks/pagination';
import { getMessageFromError } from 'src/utils/error';

type Props = {
  movie: Movie;
  quotes: Quote[];
  error?: string;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await getMovies();
  const paths = movies.map((movie) => ({ params: { id: movie._id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const movieId = params?.id as string;

  try {
    const movie = await getMovie(movieId);
    const quotes = await getMovieQuotes(movieId);

    return { props: { movie, quotes } };
  } catch (err) {
    return {
      props: { error: getMessageFromError(err), movie: emptyMovie, quotes: [] },
    };
  }
};

const Movie: FunctionComponent<Props> = ({ movie, quotes, error }) => {
  const {
    currentItems: currentQuotes,
    currentPage,
    setCurrentPage,
    pageCount,
  } = usePaginationRange(quotes);

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
            <Alert severity="error">Error fetching movie info: {error}</Alert>
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
                {currentQuotes.length === 0 ? (
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
                      {currentQuotes.map((quote) => (
                        <QuoteInfo
                          key={quote._id}
                          quote={quote}
                          linkTo="character"
                        />
                      ))}
                    </ListContainer>
                    <Pagination
                      page={currentPage}
                      count={pageCount}
                      onChange={(_e, page) => setCurrentPage(page)}
                    />
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
