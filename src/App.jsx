import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';

export const App = () => {
  return (
    <BrowserRouter basename="/">
      <Layout />
    </BrowserRouter>
  );
};
