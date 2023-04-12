import type { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
import '@fontsource/abyssinica-sil';

const theme = createTheme({
  palette: {
    primary: {
      main: '#14322B',
    },
  },
  typography: {
    fontFamily: ['Abyssinica SIL', 'serif'].join(', '),
  },
});

const ThemeProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
