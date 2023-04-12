import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import type { Movie } from 'src/models/Movie';

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  marginBottom: '5px',
}));

const MovieInfo: FunctionComponent<{ movie: Movie }> = ({ movie }) => (
  <Box>
    <Typography sx={{ fontSize: '18px', marginBottom: '8px' }}>
      {movie.name}
    </Typography>
    <InfoRow>
      <AccessAlarmsIcon /> Runtime: {movie.runtimeInMinutes} minutes
    </InfoRow>
    <InfoRow>
      <LocalAtmIcon /> Budget: ${movie.budgetInMillions}M
    </InfoRow>
    <InfoRow>
      <StarIcon /> Academy award nominations: {movie.academyAwardNominations}
    </InfoRow>
    <InfoRow>
      <EmojiEventsIcon />
      Academy award wins: {movie.academyAwardWins}
    </InfoRow>
    <InfoRow>
      <ThumbUpOffAltIcon /> Rotten Tomatoes score:{' '}
      {Math.round(movie.rottenTomatoesScore)}%
    </InfoRow>
  </Box>
);

export default MovieInfo;
