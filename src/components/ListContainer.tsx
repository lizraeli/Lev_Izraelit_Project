import { styled } from '@mui/material/styles';

const ListContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  marginBottom: '20px',
  width: '50%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

export default ListContainer;
