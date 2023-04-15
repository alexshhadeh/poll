import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from '@mui/material';

import { Poll } from '../../poll/poll';
import { routes } from '../../../routes';
import { styles } from './styles';

export const PollView = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pollId = searchParams.get('id');

  const [poll, setPoll] = useState();
  const [choices] = useState({});

  console.log(choices);

  // const updateChoices = (index, value) => {
  //   choices[index] = value;
  //   setChoices([...choices]);
  // };

  const fetchPoll = useCallback(async () => {
    const poll = await Poll.poll(pollId);
    setPoll(poll);
  }, [pollId]);

  const vote = (field) => {
    if (choices[field]) {
      choices[field] += 1;
    } else {
      choices[field] = 1;
    }
  };

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  return (
    <Box sx={styles.mainBox}>
      <Typography variant="h4" css={styles.question}>
        {poll?.title}
      </Typography>
      {poll?.fields.map((field, index) => {
        return (
          <Box key={'field_' + index} css={styles.fields}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor={field}>Field {index + 1}</InputLabel>
              <Input id={field} value={field} readOnly />
            </FormControl>
            <Button variant="contained" onClick={() => vote(field)}>
              Vote
            </Button>
          </Box>
        );
      })}

      <br />
      <Button
        variant="contained"
        onClick={() => {
          Poll.vote(pollId, choices);
          navigate(routes.pollResultsViewById(pollId));
        }}
        css={styles.button}
      >
        Submit
      </Button>
    </Box>
  );
};
