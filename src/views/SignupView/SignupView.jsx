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
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from 'firebase/auth';

import { auth, googleProvider } from '../../components/Auth/Auth';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

import db from '../../api/firestore_db';
import { uploadImage } from '../../api/storage';

import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

export const SignupView = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [singUpError, setSignUpError] = useState(null);

  function handleSignUp() {
    if (verifyPassword(password, password))
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(
            `%cUser with id: ${user.uid} created successfully`,
            'color: green;'
          );
          createFirestoreUser(user, true);

          navigate(routes.createPollView);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setSignUpError(error);
        });
  }
  function verifyPassword(password, repeatedPassword) {
    if (password === repeatedPassword) {
      return true;
    }
  }

  function handleGoogleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        createFirestoreUser(user, false);
        navigate(routes.createPollView);
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
      });
  }

  async function createFirestoreUser(user, is_logged_in_by_email) {
    const user_data = {
      uid: user.uid,
      email: user.email,
      location: null,
    }
    addDoc(collection(db, 'users'), user_data);
    console.log(`%cUser with id: ${user.uid} has been created successfully.`, 'color: green;');
    if (selectedImage) {
      const imageName = 'profile_image_' + String(user.uid);
      uploadImage(selectedImage, imageName)
    }
    updateUserStats(is_logged_in_by_email)
  }

  async function updateUserStats(is_logged_in_by_email) {
    const statsRef = doc(db, 'statistics', "created_users");
    const statsDoc = await getDoc(statsRef);
    const statsDocData = statsDoc.data();
    if (is_logged_in_by_email) {
      statsDocData.by_email += 1;
    } else {
      statsDocData.by_external_authenticator += 1;
    }

    await updateDoc(statsRef, statsDocData);
    console.log(`%cUser statistics has been updated successfully.`, 'color: green;');

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
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
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
        onChange={(event) => {
          setRepeatedPassword(event.target.value);
        }}
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
      {selectedImage !== null ?
        (<Avatar
          css={styles.avatar}
          src={URL.createObjectURL(selectedImage)}
          sx={{ width: 100, height: 100 }}/>)
        :
        (<Avatar
          css={styles.avatar}
          src="/broken-image.jpg"
          sx={{ width: 100, height: 100 }}/>)
      }
      <Button variant="contained" component="label" css={styles.button}>
        {selectedImage === null ? "Add avatar" : "Change avatar"}
        <input
          hidden
          accept="image/*"
          multiple type="file"
          onClick={() => {if (selectedImage !== null) setSelectedImage(null)}}
          onChange={(event) => {if (selectedImage === null) setSelectedImage(event.target.files[0])}}
        />
      </Button>
      {selectedImage &&
      (<Button
        variant="contained"
        color="primary"
        css={styles.button}
        onClick={() => {if (selectedImage !== null) setSelectedImage(null)}}
      >
        Remove avatar
      </Button>) }
      {singUpError && (
        <Alert severity="error">
          <AlertTitle>Sign up error</AlertTitle>
          Please check if your email is correct and if passwords you entered are
          the same and try again.
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        css={styles.button}
        onClick={handleSignUp}
      >
        Register
      </Button>
      <Divider css={styles.divider}>
        <Typography variant="body2" color="textSecondary">
          Or Register with
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
        Already have an account? <Link to={routes.loginView}>Login now</Link>
      </Typography>
    </div>
  );
};
