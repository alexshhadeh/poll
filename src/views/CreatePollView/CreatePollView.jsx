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

import { Poll } from '../../poll/poll';

export const CreatePollView = () => {
  const [alignment, setAlignment] = React.useState('web');
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState(['']);
  const [allowMultiselect, setAllowMultiselect] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleFieldChange = (index) => (event) => {
    const newArray = [...fields];
    newArray[index] = event.target.value;
    setFields(newArray);
  };
  const handleAllowMultiselectChange = (event, newAlignment) => {
    if (event.target.value === 'web') {
      setAllowMultiselect(false);
    } else {
      setAllowMultiselect(true);
    }
    setAlignment(newAlignment);
  };

  const addField = (dasds) => {
    setFields([...fields, '']);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div css={styles.root}>
      <Avatar alt="App Logo" css={styles.logo} sx={{ width: 56, height: 56 }}>
        Create a poll
      </Avatar>
      <TextField
        label="Poll Question"
        variant="standard"
        type="text"
        fullWidth
        css={styles.input}
        value={title}
        onChange={handleTitleChange}
      />

      {fields.map((_, index) => (
        <div css={styles.optionStyles} key={`field_${index}`}>
          <TextField
            label={`Option ${index + 1}`}
            value={fields[index]}
            onChange={handleFieldChange(index)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeField(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="outlined" onClick={addField} margin="normal">
        Add Option
      </Button>
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

      <Button
        variant="contained"
        color="primary"
        fullWidth
        css={styles.button}
        onClick={async () => {
          const pollId = await Poll.create(
            'fake_user_id',
            title,
            fields,
            allowMultiselect
          );
          navigate(`/poll?id=${pollId}`);
        }}
      >
        Create
      </Button>
    </div>
  );
};
