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
import { app } from '../../api/firestore_db'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { routes } from '../../../routes';

export const SignupView = () => {
  const navigate = useNavigate();

  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [singUpError, setSignUpError] = useState(null)

  function handleSignUp() {
    if (verifyPassword(password, password))
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(`%cUser with id: ${user.uid} created successfully`, "color: green;")
          navigate(routes.createPollView);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
          setSignUpError(error)
        });
  }
  function verifyPassword(password, repeatedPassword) {
    if (password === repeatedPassword) {
      return true;
    }
  }
  return (
    <div css={styles.root}>
      <Avatar alt="App Logo" css={styles.logo} sx={{ width: 56, height: 56 }}>
        Register
      </Avatar>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        fullWidth
        css={styles.input} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={event => { setPassword(event.target.value) }}
        fullWidth
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
      <TextField
        label="Confirm password"
        type="password"
        value={repeatedPassword}
        onChange={event => { setRepeatedPassword(event.target.value) }}
        fullWidth
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
      {singUpError &&
        <Alert severity="error">
          <AlertTitle>Sign up error</AlertTitle>
          Please check if your email is correct and if passwords you entered are the same and try again.
        </Alert>
      }
      <Button variant="contained" color="primary" fullWidth css={styles.button} onClick={handleSignUp}>
        Register
      </Button>
      <Divider css={styles.divider}>
        <Typography variant="body2" color="textSecondary">
          Or Register with
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
        Already have an account? <a href="/#">Login now</a>
      </Typography>
    </div>
  );
};
