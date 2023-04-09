import React from 'react';
import { Header } from '../Header/Header';
import { MainRouterContainer } from '../MainRouterContainer/MainRouterContainer';

export const Layout = () => {
  return (
    <div>
      <Header />
      <MainRouterContainer />
    </div>
  );
};
