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

import { styles } from './styles';

export const SignupView = () => {
  return (
    <div css={styles.root}>
      <Avatar alt="App Logo" css={styles.logo} sx={{ width: 56, height: 56 }}>
        Register
      </Avatar>
      <TextField
        label="Username"
        type="text"
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Password"
        type="password"
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
      <Button variant="contained" color="primary" fullWidth css={styles.button}>
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
        Already have an account? <a href="#">Login now</a>
      </Typography>
    </div>
  );
};
