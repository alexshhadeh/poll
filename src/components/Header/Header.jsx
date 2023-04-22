import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUser
              ? currentUser.displayName
                ? currentUser.displayName
                : currentUser.email
              : 'Poll App'}
          </Typography>
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
