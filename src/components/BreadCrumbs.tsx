import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadCrumb {
  text: string;
  link: string;
}

const BreadCrumbs: FunctionComponent<{
  crumbs: BreadCrumb[];
  current: string;
}> = ({ crumbs, current }) => (
  <Breadcrumbs
    aria-label="breadcrumb"
    sx={{ marginTop: '20px' }}
    separator={<NavigateNextIcon fontSize="small" />}
  >
    {crumbs.map(({ text, link }) => (
      <Link
        key={text}
        component={NextLink}
        underline="hover"
        color="inherit"
        href={link}
      >
        {text}
      </Link>
    ))}
    <Typography color="text.primary">{current}</Typography>
  </Breadcrumbs>
);

export default BreadCrumbs;
