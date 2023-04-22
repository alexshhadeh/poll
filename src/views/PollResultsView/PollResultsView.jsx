import React from 'react';
import { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Divider,
} from '@mui/material';

import { styles } from './styles';
import { Poll } from '../../poll/poll';
import { PollQuestion } from '../../components/PollQuestion/PollQuestion';
import { AuthContext } from '../../components/Auth/Auth';

export const PollResultsView = () => {
  const [searchParams] = useSearchParams();
  const [pollResultsData, setPollResultsData] = useState();
  const [pollData, setPollData] = useState({});

  const { currentUser } = useContext(AuthContext);

  const pollTitle = useMemo(() => {
    return pollData?.title;
  }, [pollData?.title]);

  const pollResults = useMemo(() => {
    if (currentUser) {
      console.log(pollResultsData);
      return pollResultsData;
    } else {
      console.log(pollData?.allow_view_results);
      console.log(pollResultsData);
      return pollData?.allow_view_results ? pollResultsData : undefined;
    }
  }, [currentUser, pollData?.allow_view_results, pollResultsData]);

  const pollId = useMemo(() => searchParams.get('id'), [searchParams]);

  const fetchPollResults = useCallback(async () => {
    const res = await Poll.results(pollId);
    setPollResultsData(res);
  }, [pollId]);

  const fetchiPollTitle = useCallback(async () => {
    const poll = await Poll.poll(pollId);
    setPollData(poll);
  }, [pollId]);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPollResults();
    fetchiPollTitle();
  }, [fetchPollResults, fetchiPollTitle]);

  return (
    <Box sx={styles.mainBox}>
      {pollResults ? (
        <>
          <PollQuestion pollTitle={pollTitle} />
          {Object.keys(pollResults).map((result, index) => {
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
        </>
      ) : (
        <Box>
          <Typography variant="h4" sx={{ margin: '50px 0' }}>
            Thank you for voting!
          </Typography>
          <Divider
            component="div"
            role="presentation"
            sx={{ margin: '25px 0' }}
          ></Divider>
        </Box>
      )}
    </Box>
  );
};
