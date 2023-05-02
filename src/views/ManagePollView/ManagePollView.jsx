import React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Divider, Box, Button } from '@mui/material';
import { RWebShare } from 'react-web-share';

import { Poll } from '../../poll/poll';
import { PollQuestion } from '../../components/PollQuestion/PollQuestion';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClipboard';
import { routes } from '../../../routes';

export const ManagePollView = () => {
  const [searchParams] = useSearchParams();

  const [poll, setPoll] = useState({});
  const [pollResults, setPollResults] = useState({});
  const [allowViewResults, setAllowViewResults] = useState(false);

  const pollId = useMemo(() => searchParams.get('id'), [searchParams]);
  const pollLink = useMemo(
    () => `${routes.baseUrl}?id=${pollId}`,
    [pollId]
  );

  const fetchPoll = useCallback(async () => {
    const pollId = searchParams.get('id');
    const res = await Poll.poll(pollId);
    // setAllowViewResults(poll.allow_view_results);
    setPoll(res);
  }, [searchParams]);

  const toggleAllowViewResults = () => {
    Poll.toggleAllowViewResults(pollId, !allowViewResults);
    setAllowViewResults(!allowViewResults);
  };

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
        <Box sx={{ marginTop: '5px' }}>
          <RWebShare
            data={{
              text: 'Your opinion matters! Click the link and cast your vote in our poll.',
              url: pollLink,
              title: poll?.title,
            }}
            onClick={() => console.log('shared successfully!')}
          >
            <Button variant="contained" color="success">
              Share 🔗
            </Button>
          </RWebShare>
        </Box>
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
                <Typography
                  sx={{
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 25px',
                  }}
                >
                  <span>{result}:</span>{' '}
                  <span>{pollResults[result]} results</span>
                </Typography>
              </div>
            );
          })}
        <Divider component="div" role="presentation" sx={{ margin: '25px' }} />
        <Typography>Allow voters to see results</Typography>
        <Button
          sx={{ marginTop: '10px' }}
          variant="contained"
          onClick={toggleAllowViewResults}
        >
          {allowViewResults ? 'On' : 'Off'}
        </Button>
      </Box>
    </div>
  );
};
