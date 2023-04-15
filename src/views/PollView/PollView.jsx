import React from 'react';
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


import { Poll } from '../../poll/poll'


export const PollView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [poll, setPoll] = useState();

  const [choices, setChoices] = useState({});

  const updateChoices = (index, value) => {
    choices[index] = value;
    setChoices([...choices]);
  };

  const fetchPoll = useCallback(async () => {
    const pollId = searchParams.get("id");
    const poll = await Poll.poll(pollId)
    setPoll(poll);
  }, [])

  const vote = (field) => {
    if (choices[field]) {
      choices[field] += 1;
    } else {
      choices[field] = 1;
    }
  };

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchPoll()
  }, [])

  return (
    <div>
      <h1>{poll?.title}</h1>
      {poll?.fields.map((field, index) => {
        return (
          <div key={'field_' + index}>
            <input
              type="text"
              value={field}
              readOnly
            />
            <button onClick={() => vote(field)}>Vote</button>
          </div>
        )
      })}

      <br />
      <button onClick={() => { Poll.vote(choices) }}>Submit</button>
    </div>

    // <div className="ViewPoll">
    //   title: {poll ? poll.title : poll}
    //   allow_multiselect: {poll ? String(poll.allow_multiselect) : poll}
    //   fields:
    //   <br />
    //   <table>
    //     {
    //       poll?.fields.map((field, index) => (
    //         <td>
    //           {field}
    //         </td>
    //       ))
    //     }
    //   </table>
    // </div>

  );
};
