import type { GetServerSideProps } from 'next';
import type { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import type { Character, Movie, Quote } from 'src/models';
import { getCharacter, getCharacterQuotes } from 'src/api/requests';
import BreadCrumbs from 'src/components/BreadCrumbs';
import QuoteInfo from 'src/components/MovieQuotes';
import ListContainer from 'src/components/ListContainer';
import CharacterInfo from 'src/components/CharacterInfo';

type Props = {
  character: Character;
  quotes: Quote[];
  error?: boolean;
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
  } catch {
    return { props: { error: true, character: emptyCharacter, quotes: [] } };
  }
};

const Movie: FunctionComponent<Props> = ({ character, quotes, error }) => {
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
            <Alert severity="error">Error fetching movie info</Alert>
          ) : (
            <>
              <CharacterInfo character={character} />
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
