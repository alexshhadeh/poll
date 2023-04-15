import React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { styles } from './styles';
import { useNavigate } from 'react-router';

export const CreatePollView = () => {
  const [alignment, setAlignment] = React.useState('web');
  const [options, setOptions] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');

  const naviagte = useNavigate();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (option, index) => {
    const newOptions = [...options];
    newOptions[index] = option;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handlePollQuestionChange = (event) => {
    setPollQuestion(event.target.value);
  };

  const handleCreatePoll = (_) => {
    const output = {
      pollQuestion,
      options,
    };

    console.log(output);

    alert('A poll has just been created!');

    naviagte('/home');
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
        label="Poll Question"
        value={pollQuestion}
        onChange={handlePollQuestionChange}
        fullWidth
        margin="normal"
      />
      {options.map((option, index) => (
        <div css={styles.optionStyles} key={index}>
          <TextField
            label={`Option ${index + 1}`}
            value={option}
            onChange={(event) => updateOption(event.target.value, index)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeOption(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="outlined" onClick={addOption} margin="normal">
        Add Option
      </Button>
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

      <Button
        variant="contained"
        color="primary"
        fullWidth
        css={styles.button}
        onClick={handleCreatePoll}
      >
        Create
      </Button>
    </div>
  );
};
