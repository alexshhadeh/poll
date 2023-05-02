import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
//For error handling
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { styles } from './styles';
import { useState, useEffect } from 'react';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from 'firebase/auth';

import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { auth, googleProvider } from '../../components/Auth/Auth';
import { Poll } from '../../poll/poll';

export const LoginView = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pollId = searchParams.get('id');

  useEffect(() => {
    if (pollId) {
      navigate(routes.pollViewById(pollId));
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(null);
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(
          `%cUser with id: ${user.uid} logged in successfully`,
          'color: green;'
        );
        redirectAfterLogin(user.uid)
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoginError(error);
      });
  }

  function handleGoogleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(
          `%cUser with id: ${user.uid} logged in successfully`,
          'color: green;'
        );
        redirectAfterLogin(user.uid)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async function redirectAfterLogin(userId) {
    const pollId = await Poll.getPollIdByUserId(userId)
    if (pollId) {
      navigate(routes.managePollById(pollId));
    } else {
      navigate(routes.createPollView);
    }
  }

  return (
    <div css={styles.root}>
      <Avatar alt="App Logo" css={styles.logo} sx={{ width: 56, height: 56 }}>
        Welcome!
      </Avatar>
      <TextField
        label="Enter your email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Enter your password"
        type="password"
        fullWidth
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <i className="fas fa-eye"></i>
              </IconButton>
            </InputAdornment>
          ),
        }}
        css={styles.input}
      />
      {loginError && (
        <Alert severity="error">
          <AlertTitle>Login error</AlertTitle>
          Please check your credentials and try again.
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        css={styles.button}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Divider css={styles.divider}>
        <Typography variant="body2" color="textSecondary">
          Or Login with
        </Typography>
      </Divider>
      <Grid container spacing={1} justifyContent="center">
        {/* <Grid item>
          <Button
            variant="contained"
            color="primary"
            css={styles.socialButton}
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
        </Grid> */}
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            css={styles.socialButton}
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body2" color="textSecondary" css={styles.or}>
        Dont have an account? <Link to={routes.signupView}>Register now</Link>
      </Typography>
    </div>
  );
};
