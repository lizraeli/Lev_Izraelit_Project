import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import type { Character } from 'src/models';
import { getCharacters } from 'src/the-one-api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import CharacterInfo from 'src/components/CharacterInfo';
import ListContainer from 'src/components/ListContainer';
import { usePaginationRange } from 'src/hooks/pagination';
import { getMessageFromError } from 'src/utils/error';
import { useEffect } from 'react';

interface Props {
  characters: Character[];
  error?: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const characters = await getCharacters();

    return { props: { characters } };
  } catch (err) {
    return { props: { characters: [], error: getMessageFromError(err) } };
  }
};

const Page: NextPage<Props> = ({ characters, error }) => {
  const {
    currentItems: currentCharacters,
    currentPage,
    setCurrentPage,
    pageCount,
  } = usePaginationRange(characters);
  const router = useRouter();
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', (events) => {
      setIsLoadingCharacter(true);
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
      <BreadCrumbs
        crumbs={[{ text: 'Home', link: '/' }]}
        current="Characters"
      />

      <Typography
        sx={{ fontSize: '1.5em', padding: '20px', marginTop: '40px' }}
      >
        {isLoadingCharacter
          ? 'Loading Character...'
          : 'Characters in the Lord of the Rings'}
      </Typography>
      {isLoadingCharacter && <CircularProgress />}
      {error && <Alert severity="error">Error fetching characters</Alert>}

      {!isLoadingCharacter && (
        <>
          <ListContainer sx={{ width: '100%' }}>
            {currentCharacters.map((character) => (
              <Card
                key={character._id}
                variant="outlined"
                sx={{ width: '100%' }}
              >
                <CardActionArea
                  sx={{ padding: '20px' }}
                  LinkComponent={NextLink}
                  href={`/characters/${character._id}`}
                >
                  <CharacterInfo character={character} />
                </CardActionArea>
              </Card>
            ))}
          </ListContainer>
          <Pagination
            page={currentPage}
            count={pageCount}
            onChange={(_e, page) => setCurrentPage(page)}
            sx={{
              marginBottom: '20px',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Page;
