import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import FaceIcon from '@mui/icons-material/Face';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HeightIcon from '@mui/icons-material/Height';
import PublicIcon from '@mui/icons-material/Public';
import CakeIcon from '@mui/icons-material/Cake';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Link from '@mui/material/Link';
import RemoveIcon from '@mui/icons-material/Remove';

import type { Character } from 'src/models';

const Container = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  marginBottom: '5px',
}));

const CharacterInfo: FunctionComponent<{
  character: Character;
  linkToWiki?: boolean;
}> = ({ character, linkToWiki }) => (
  <Container>
    <Typography sx={{ fontSize: '18px', marginBottom: '20px' }}>
      {character.name}
    </Typography>
    <InfoRow>
      <FaceIcon /> Race: {character.race || 'unknown'}
    </InfoRow>
    <InfoRow>
      <TransgenderIcon /> Gender: {character.gender || 'unknown'}
    </InfoRow>
    <InfoRow>
      <CakeIcon /> Birth: {character.birth || 'unknown'}
    </InfoRow>
    {character.death && (
      <InfoRow>
        <RemoveIcon />
        Death: {character.death}
      </InfoRow>
    )}
    {character.realm && (
      <InfoRow>
        <PublicIcon /> Realm: {character.realm}
      </InfoRow>
    )}
    {character.height && (
      <InfoRow>
        <HeightIcon /> Height: {character.height}
      </InfoRow>
    )}
    {character.hair && (
      <InfoRow>
        <PaletteIcon /> Hair: {character.hair}
      </InfoRow>
    )}
    {character.spouse && (
      <InfoRow>
        <VolunteerActivismIcon />
        Spouse: {character.spouse}
      </InfoRow>
    )}
    {character.wikiUrl && (
      <InfoRow>
        <LanguageIcon /> Wiki URL:{' '}
        {linkToWiki ? (
          <Link href={character.wikiUrl}>{character.wikiUrl}</Link>
        ) : (
          character.wikiUrl
        )}
      </InfoRow>
    )}
  </Container>
);

export default CharacterInfo;
