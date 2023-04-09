import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeView } from '../../views/HomeView/HomeView';
import { LoginView } from '../../views/LoginView/LoginView';
import { SingupView } from '../../views/SignupView/SignupView';

export const MainRouterContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<SingupView />} />
    </Routes>
  );
};
