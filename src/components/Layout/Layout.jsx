import React from 'react';
import { Header } from '../Header/Header';
import { MainRouterContainer } from '../MainRouterContainer/MainRouterContainer';
import Container from '@mui/material/Container';


export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: 3 }}>
        <MainRouterContainer />
      </Container>
    </>
  );
};
