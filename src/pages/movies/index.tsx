import type { GetServerSideProps, NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';

import type { Movie } from 'src/models/Movie';
import { getMovies } from 'src/api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import MovieInfo from 'src/components/MovieInfo';

interface Props {
  movies: Movie[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const movies = await getMovies();

  return { props: { movies } };
};

const ListContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  marginBottom: '20px',
  width: '50%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

const Page: NextPage<Props> = ({ movies }) => {
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
      <Typography sx={{ fontSize: '24px', padding: '20px', marginTop: '40px' }}>
        Movie adapations of the Lord of the Rings
      </Typography>
      <ListContainer>
        {movies.map((movie) => (
          <Card key={movie._id} variant="outlined" sx={{ width: '100%' }}>
            <CardActionArea
              sx={{ padding: '20px' }}
              LinkComponent={NextLink}
              href="#"
            >
              <MovieInfo movie={movie} />
            </CardActionArea>
          </Card>
        ))}
      </ListContainer>
    </Box>
  );
};

export default Page;
