import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StarIcon from '@mui/icons-material/Star';
import MovieIcon from '@mui/icons-material/Movie';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import type { Movie, Quote } from 'src/models';

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  marginBottom: '5px',
}));

interface Props {
  quote: Quote;
  hideMovie?: boolean;
  hideCharacter?: boolean;
}

const QuoteInfo: FunctionComponent<Props> = ({
  quote,
  hideMovie,
  hideCharacter,
}) => (
  <Box>
    <blockquote>{quote.dialog}</blockquote>
  </Box>
);

export default QuoteInfo;
