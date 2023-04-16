import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginView } from '../../views/LoginView/LoginView';
import { CreatePollView } from '../../views/CreatePollView/CreatePollView';
import { PollView } from '../../views/PollView/PollView';
import { PollResultsView } from '../../views/PollResultsView/PollResultsView';
import { ManagePollView } from '../../views/ManagePollView/ManagePollView';
import { SignupView } from '../../views/SignupView/SignupView';
import { routes } from '../../../routes';

export const MainRouterContainer = () => {
  return (
    <Routes>
      <Route path={routes.homeView} element={<LoginView />} />
      <Route path={routes.loginView} element={<LoginView />} />
      <Route path={routes.signupView} element={<SignupView />} />
      <Route path={routes.createPollView} element={<CreatePollView />} />
      <Route path={routes.pollView} element={<PollView />} />
      <Route path={routes.pollResultsView} element={<PollResultsView />} />
      <Route path={routes.manageView} element={<ManagePollView />} />
    </Routes>
  );
};