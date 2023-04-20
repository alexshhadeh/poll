import React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Divider, Box } from '@mui/material';

import { Poll } from '../../poll/poll';
import { PollQuestion } from '../../components/PollQuestion/PollQuestion';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClipboard';
import { routes } from '../../../routes';

export const ManagePollView = () => {
  const [searchParams] = useSearchParams();

  const [poll, setPoll] = useState({});
  const [pollResults, setPollResults] = useState({});

  const pollId = useMemo(() => searchParams.get('id'), [searchParams]);
  const pollLink = useMemo(
    () => `${routes.baseUrl}${routes.pollViewById(pollId)}`,
    [pollId]
  );

  const fetchPoll = useCallback(async () => {
    const pollId = searchParams.get('id');
    const res = await Poll.poll(pollId);
    setPoll(res);
  }, [searchParams]);

  const fetchPollResults = useCallback(async () => {
    const pollResults = await Poll.results(pollId);
    setPollResults(pollResults);
  }, [pollId]);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPoll();
    fetchPollResults();
  }, [fetchPoll, fetchPollResults]);

  return (
    <div>
      <Box>
        <Box sx={{ margin: '25px' }}>
          <Typography>Poll has been created successfuly!</Typography>
          <Typography variant="caption">
            Share your poll to others using the link below:
          </Typography>
        </Box>
        <CopyToClipboard text={pollLink} disabled />
        <Divider
          component="div"
          role="presentation"
          sx={{ margin: '50px' }}
        ></Divider>
      </Box>
      <Box>
        <PollQuestion pollTitle={poll?.title} />
        {pollResults &&
          Object.keys(pollResults).map((result, index) => {
            return (
              <div key={'field_' + index}>
                <Typography sx={{ marginBottom: '10px' }}>
                  {result}: {pollResults[result]}
                </Typography>
              </div>
            );
          })}
      </Box>
    </div>
  );
};
