import type { GetServerSideProps } from 'next';
import type { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import type { Character, Movie, Quote } from 'src/models';
import { getCharacter, getCharacterQuotes } from 'src/the-one-api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import QuoteInfo from 'src/components/QuoteInfo';
import ListContainer from 'src/components/ListContainer';
import CharacterInfo from 'src/components/CharacterInfo';
import { usePaginationRange } from 'src/hooks/pagination';
import { getMessageFromError } from 'src/utils/error';

type Props = {
  character: Character;
  quotes: Quote[];
  error?: string;
};

const emptyCharacter: Character = {
  _id: '',
  height: '',
  race: '',
  gender: '',
  birth: '',
  spouse: '',
  death: '',
  realm: '',
  hair: '',
  name: '',
  wikiUrl: '',
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const characterId = context.query.id as string;

  try {
    const character = await getCharacter(characterId);
    const quotes = await getCharacterQuotes(characterId);

    return { props: { character, quotes } };
  } catch (err) {
    return {
      props: {
        error: getMessageFromError(err),
        character: emptyCharacter,
        quotes: [],
      },
    };
  }
};

const Movie: FunctionComponent<Props> = ({ character, quotes, error }) => {
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
            { text: 'Characters', link: '/characters' },
          ]}
          current={character.name}
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
            <Alert severity="error">
              Error fetching character info: {error}
            </Alert>
          ) : (
            <>
              <CharacterInfo character={character} linkToWiki />
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
                          linkTo="movie"
                        />
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
