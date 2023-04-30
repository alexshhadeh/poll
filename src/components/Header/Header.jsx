import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { app } from '../../api/firestore_db';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { routes } from '../../../routes';

import { AuthContext } from '../Auth/Auth';

const auth = getAuth(app);

export const Header = () => {
  return (
    <Typography variant="h1" component="h2">
      <ButtonAppBar />
    </Typography>
  );
};

function ButtonAppBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSignOut() {
    await auth.signOut();
    navigate(routes.loginView);
    console.log(`%cUser logged out successfully`, 'color: green;');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {currentUser
              ? currentUser.displayName
                ? currentUser.displayName
                : currentUser.email
              : 'Poll App'}
          </Typography>
          {currentUser && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate(routes.createPollView)}
              >
                Create
              </Button>
            </>
          )}
          <Button
            color="inherit"
            onClick={async () => {
              await handleSignOut();
            }}
          >
            {currentUser ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
