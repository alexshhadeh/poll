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

import { Poll } from '../../poll/poll'
import { useNavigate } from "react-router-dom";



export const CreatePollView = () => {
  const [alignment, setAlignment] = React.useState('web');
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState(['']);
  const [allowMultiselect, setAllowMultiselect] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleFieldChange = (index) => (event) => {
    const newArray = [...fields];
    newArray[index] = event.target.value;
    setFields(newArray);
  }
  const handleAllowMultiselectChange = (event, newAlignment) => {
    if (event.target.value == 'web') {
      setAllowMultiselect(false);
    } else {
      setAllowMultiselect(true);
    }
    setAlignment(newAlignment);
  };

  const handleAddField = () => {
    const newArray = [...fields];
    newArray.push('');
    setFields(newArray);
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
        value={title}
        onChange={handleTitleChange}
      />

      {fields.map((_, index) => {
        return <TextField
          key={`field_${index}`}
          label="Option"
          type="text"
          value={fields[index]}
          onChange={handleFieldChange(index)}
          fullWidth
          css={styles.input}
        />;
      }
      )}

      <Fab color="primary" aria-label="add" onClick={handleAddField} css={styles.button}>
        <AddIcon />
      </Fab>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAllowMultiselectChange}
        aria-label="Platform"
        css={styles.button}
      >
        <ToggleButton value="web">Single-choice</ToggleButton>
        <ToggleButton value="android">Multiple-choice</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" color="primary" fullWidth css={styles.button} onClick={
        async () => {
          const pollId = await Poll.create('fake_user_id', title, fields, allowMultiselect);
          navigate(`/poll?id=${pollId}`);
        }
      }>
        Create
      </Button>
    </div>
  );
};
