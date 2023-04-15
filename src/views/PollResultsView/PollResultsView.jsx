import React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, Input, Typography } from '@mui/material';

import { styles } from './styles';
import { Poll } from '../../poll/poll';

export const PollResultsView = () => {
  const [searchParams] = useSearchParams();
  const [pollResults, setPollResults] = useState();
  const [pollTitle, setPollTitle] = useState('');

  const pollId = useMemo(() => searchParams.get('id'), [searchParams]);

  const fetchPollResults = useCallback(async () => {
    const pollResults = await Poll.results(pollId);
    setPollResults(pollResults);
  }, [pollId]);

  const fetchiPollTitle = useCallback(async () => {
    const poll = await Poll.poll(pollId);
    setPollTitle(poll?.title);
  }, [pollId]);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPollResults();
    fetchiPollTitle();
  }, [fetchPollResults, fetchiPollTitle]);

  return (
    <Box sx={styles.mainBox}>
      <Typography variant="h4" css={styles.question}>
        {pollTitle}
      </Typography>
      {pollResults &&
        Object.keys(pollResults).map((result, index) => {
          return (
            <Box key={'field_' + index} css={styles.fields}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor={result}>Field {index + 1}</InputLabel>
                <Input id={result} value={result} readOnly />
              </FormControl>
              <Typography variant="caption">
                {pollResults[result]} votes
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};
