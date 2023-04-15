import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { Poll } from '../../poll/poll';

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
    <div>
      <h1>{poll?.title}</h1>
      {poll?.fields.map((field, index) => {
        return (
          <div key={'field_' + index}>
            <input type="text" value={field} readOnly />
            <button onClick={() => vote(field)}>Vote</button>
          </div>
        );
      })}

      <br />
      <button
        onClick={() => {
          Poll.vote(pollId, choices);
          navigate(`/results?id=${pollId}`);
        }}
      >
        Submit
      </button>
    </div>
  );
};
