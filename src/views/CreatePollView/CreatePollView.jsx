import React from 'react';
import { useState, useCallback } from 'react';
import {
  Avatar,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';

import { styles } from './styles';
import { Poll } from '../../poll/poll';
import { routes } from '../../../routes';

export const CreatePollView = () => {
  const [alignment, setAlignment] = React.useState('web');
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [allowMultiselect, setAllowMultiselect] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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

  const addField = (_) => {
    setFields((prevFields) => [...prevFields, '']);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = useCallback(async () => {
    const filteredFields = fields.filter((element) => element !== '');
    if (title && !isEmpty(filteredFields)) {
      console.log(fields.length);

      const pollId = await Poll.create(
        'fake_user_id',
        title,
        filteredFields,
        allowMultiselect
      );

      navigate(routes.pollViewById(pollId));
    } else {
      handleOpenSnackbar();
    }
  }, [allowMultiselect, fields, navigate, title]);

  return (
    <div css={styles.root}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          Please provide valid input
        </Alert>
      </Snackbar>
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
            css={styles.removeButton}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant="outlined"
        onClick={addField}
        margin="normal"
        css={styles.addOptionButton}
      >
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
        onClick={handleSubmit}
      >
        Create
      </Button>
    </div>
  );
};
