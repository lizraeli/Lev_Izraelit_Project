import { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Tooltip from '@mui/material/Tooltip';
import NextLink from 'next/link';

import type { Quote } from 'src/models';

interface Props {
  quote: Quote;
  linkTo: 'movie' | 'character';
}

const QuoteInfo: FunctionComponent<Props> = ({ quote, linkTo }) => {
  let href: string, tooltipText: string;
  if (linkTo === 'movie') {
    href = `/movies/${quote.movie}`;
    tooltipText = 'Go to the movie where this was uttered';
  } else {
    href = `/characters/${quote.character}`;
    tooltipText = 'Go to the character who said this';
  }

  return (
    <Card key={quote._id} variant="outlined" sx={{ width: '100%' }}>
      <Tooltip title={tooltipText}>
        <CardActionArea LinkComponent={NextLink} href={href}>
          <blockquote>{quote.dialog}</blockquote>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
};

export default QuoteInfo;
