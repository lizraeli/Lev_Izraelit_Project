import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import NextLink from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import type { Character } from 'src/models';

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  marginBottom: '5px',
}));

const CharacterInfo: FunctionComponent<{ character: Character }> = ({
  character,
}) => (
  <Box>
    <Typography sx={{ fontSize: '18px', marginBottom: '8px' }}>
      {character.name}
    </Typography>
    <InfoRow>Race: {character.race || 'unknown'}</InfoRow>
    <InfoRow>Gender: {character.gender || 'unknown'}</InfoRow>
    <InfoRow>Birth: {character.birth || 'unknown'}</InfoRow>
    {character.death && <InfoRow>Death: {character.death}</InfoRow>}
    {character.realm && <InfoRow>Realm: {character.realm}</InfoRow>}
    {character.height && <InfoRow>Height: {character.height}</InfoRow>}
    {character.hair && <InfoRow>Hair: {character.hair}</InfoRow>}
    {character.spouse && <InfoRow>Spouse: {character.spouse}</InfoRow>}
    {character.wikiUrl && (
      <InfoRow>
        Wiki URL: <Link href={character.wikiUrl}>{character.wikiUrl}</Link>
      </InfoRow>
    )}
  </Box>
);

export default CharacterInfo;
