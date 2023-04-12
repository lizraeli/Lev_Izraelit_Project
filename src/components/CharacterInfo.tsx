import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import type { Character } from 'src/models';

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  marginBottom: '5px',
}));

const MovieInfo: FunctionComponent<{ character: Character }> = ({
  character,
}) => (
  <Box>
    <Typography sx={{ fontSize: '18px', marginBottom: '8px' }}>
      {character.name}
    </Typography>
    <InfoRow>Race: {character.race}</InfoRow>
    <InfoRow>Gender: {character.gender}</InfoRow>
    <InfoRow>Realm: {character.realm}</InfoRow>

    <InfoRow>Birth: {character.birth}</InfoRow>
    {character.death && <InfoRow>Death: {character.death}</InfoRow>}
    {character.height && <InfoRow>Height: {character.height}</InfoRow>}
    {character.hair && <InfoRow>Hair: {character.hair}</InfoRow>}
    {character.spouse && <InfoRow>Spouse: {character.spouse}</InfoRow>}
    <InfoRow>Wiki URL: {character.wikiUrl || 'N/A'}</InfoRow>
  </Box>
);

export default MovieInfo;
