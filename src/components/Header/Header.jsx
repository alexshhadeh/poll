import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { app } from '../../api/firestore_db';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { routes } from '../../../routes';

import { AuthContext } from '../Auth/Auth';
import { Poll } from '../../poll/poll';
import { useSearchParams } from 'react-router-dom';

import { getUserProfileImage } from '../../api/storage';

const auth = getAuth(app);


export const Header = () => {
  return (
    <Typography variant="h1" component="h2">
      <ButtonAppBar />
    </Typography>
  );
};

function ButtonAppBar() {

  const [searchParams] = useSearchParams();
  const paramPollId = searchParams.get('id');

  const [profileImage, setProfileImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      displayProfileImage(currentUser.uid)

      if (!paramPollId) {
        redirectAfterLogin(currentUser.uid)
      }
    }
  }, [currentUser]);

  async function displayProfileImage(userId) {
    const profileImage = await getUserProfileImage(userId);
    setProfileImage(profileImage)
  }

  async function redirectAfterLogin(userId, paramPollId) {
    const pollId = await Poll.getPollIdByUserId(userId)
    if (pollId) {
      navigate(routes.managePollById(pollId));
    } else {
      navigate(routes.createPollView);
    }
  }

  async function handleSignOut() {
    await auth.signOut();
    setProfileImage(null);
    navigate(routes.loginView);
    console.log(`%cUser logged out successfully`, 'color: green;');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            currentUser && (
              profileImage ?
                (<Avatar
                  src={profileImage}
                  sx={{ width: 50, height: 50 }}/>)
                :
                (<Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 50, height: 50 }}/>))
          }
          <Typography component="div" sx={{ flexGrow: 1, margin: 2 }}>
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
