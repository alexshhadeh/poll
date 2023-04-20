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
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
//For error handling
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { styles } from './styles';
import { useState } from 'react';

import { app } from '../../api/firestore_db'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router';
import { routes } from '../../../routes';

const auth = getAuth(app);

export const LoginView = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(null)
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`%cUser with id: ${user.uid} logged in successfully`, "color: green;")
        navigate(routes.createPollView);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        setLoginError(error)
      });
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
        onChange={event => setEmail(event.target.value)}
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Enter your password"
        type="password"
        fullWidth
        value={password}
        onChange={event => setPassword(event.target.value)}
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
      {loginError &&
        <Alert severity="error">
          <AlertTitle>Login error</AlertTitle>
          Please check your credentials and try again.
        </Alert>
      }
      <Button variant="contained" color="primary" fullWidth css={styles.button} onClick={handleLogin}>
        Login
      </Button>
      <Divider css={styles.divider}>
        <Typography variant="body2" color="textSecondary">
          Or Login with
        </Typography>
      </Divider>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            css={styles.socialButton}
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            css={styles.socialButton}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body2" color="textSecondary" css={styles.or}>
        Dont have an account? <a onClick={() => { navigate(routes.signupView) }}>Register now</a>
      </Typography>
    </div>
  );
};
