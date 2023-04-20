import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { app } from '../../api/firestore_db'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router';
import { routes } from '../../../routes';
const auth = getAuth(app);

export const Header = () => {
  return (
    <Typography variant="h1" component="h2">
      <ButtonAppBar />
    </Typography>
  );
};

function ButtonAppBar() {
  const navigate = useNavigate();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     signOut(auth).then(() => {
  //       console.log(`%cUser with id: ${uid} logged out successfully`, "color: green;")
  //       navigate(routes.loginView);
  //     }).catch((error) => {
  //       alert('Sorry, an error happend during log out, please try again.')
  //     });
  //     // ...
  //   } else {
  //     navigate(routes.loginView);
  //     console.log(`%cLogout failed: there is no active user! Redirecting to login`, "color: yellow;")
  //   }
  // });

  async function handleSignOut() {
    await auth.signOut();
    navigate(routes.loginView);
    console.log(`%cUser logged out successfully`, "color: green;")
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
            Poll App
          </Typography>
          <Button color="inherit" onClick={async () => {
            await handleSignOut()
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

