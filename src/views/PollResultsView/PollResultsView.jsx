import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Poll } from '../../poll/poll';

export const PollResultsView = () => {
  const [searchParams] = useSearchParams();
  const [pollResults, setPollResults] = useState();

  const fetchPollResults = useCallback(async () => {
    const pollId = searchParams.get('id');
    const pollResults = await Poll.results(pollId);
    setPollResults(pollResults);
  }, [searchParams]);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPollResults();
  }, [fetchPollResults]);

  return (
    <div>
      {pollResults &&
        Object.keys(pollResults).map((result, index) => {
          return (
            <div key={'field_' + index}>
              {result}: {pollResults[result]}
            </div>
          );
        })}
    </div>
  );
};
