import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CreatePollView } from './views/CreatePollView/CreatePollView'

export const App = () => {
  return (
    <BrowserRouter basename="/">
      <Layout />
    </BrowserRouter>
  );
};