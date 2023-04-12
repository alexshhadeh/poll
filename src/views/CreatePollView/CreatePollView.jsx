import React from 'react';
import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { styles } from './styles';

export const CreatePollView = () => {
  const [alignment, setAlignment] = React.useState('web');
  const [counter, setCounter] = useState(0);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };
  return (
    <div css={styles.root}>
      <Avatar alt="App Logo" css={styles.logo} sx={{ width: 56, height: 56 }}>
        Create a poll
      </Avatar>
      <TextField
        label="Title"
        variant="standard"
        type="text"
        fullWidth
        css={styles.input}
      />
      <TextField
        label="Option"
        type="text"
        fullWidth
        css={styles.input}
      />
      {Array.from(Array(counter)).map((c, index) => {
        return <TextField
        key={c}
        label="Option"
        type="text"
        fullWidth
        css={styles.input}
      />;
      })}
      <Fab color="primary" aria-label="add" onClick={handleClick} css={styles.button}>
        <AddIcon />
      </Fab>

      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      css={styles.button}
    >
      <ToggleButton value="web">Single-choice</ToggleButton>
      <ToggleButton value="android">Multiple-choice</ToggleButton>
    </ToggleButtonGroup>

      <Button variant="contained" color="primary" fullWidth css={styles.button}>
        Create
      </Button>
    </div>
  );
};
