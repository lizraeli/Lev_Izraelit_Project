import Head from 'next/head';
import styles from 'src/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { FunctionComponent, PropsWithChildren } from 'react';

interface TopLinkProps extends PropsWithChildren {
  href: string;
}

const TopLink: FunctionComponent<TopLinkProps> = ({ href, children }) => (
  <Link
    component={NextLink}
    underline="none"
    href={href}
    sx={{
      borderBottomColor: '#808080',
      borderBottomStyle: 'solid',
      '&:hover': {
        borderBottomStyle: 'none',
      },
    }}
  >
    {children}
  </Link>
);

const Content = () => (
  <div>
    <Head>
      <title>LOTR</title>
      <meta name="description" content="LOTR" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '40px',

          gap: '20px',
        }}
      >
        <TopLink href={'/movies'}>Movies</TopLink>
        <TopLink href={'/quotes'}>Quotes</TopLink>
      </Box>
      <Typography sx={{ fontSize: '24px', padding: '20px', marginTop: '40px' }}>
        Lord of the Rings: Movies & Quotes
      </Typography>
    </Box>
  </div>
);

export default function Home() {
  return <Content />;
}
