import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/Auth/Auth'
import { Layout } from './components/Layout/Layout';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
};
