import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeView } from '../../views/HomeView/HomeView';
import { LoginView } from '../../views/LoginView/LoginView';
import { CreatePollView } from '../../views/CreatePollView/CreatePollView';
import { SignupView } from '../../views/SignupView/SignupView';

export const MainRouterContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<SignupView />} />
      <Route path="/create" element={<CreatePollView />} />
    </Routes>
  );
};
