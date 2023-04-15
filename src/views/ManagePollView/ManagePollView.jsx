import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Poll } from '../../poll/poll';

export const ManagePollView = () => {
    const [searchParams] = useSearchParams();
    const pollId = searchParams.get('id');
    const [pollResults, setPollResults] = useState();
    const pollLink = `${window.location.origin}/poll?id=${pollId}`;

    const [poll, setPoll] = useState();

    const fetchPollResults = useCallback(async () => {
        const pollResults = await Poll.results(pollId);
        setPollResults(pollResults);
    }, [searchParams]);


    const fetchPoll = useCallback(async () => {
        const poll = await Poll.poll(pollId);
        setAllowViewResults(poll.allow_view_results);
        setPoll(poll);
    }, [pollId]);

    const [allowViewResults, setAllowViewResults] = useState(false);

    const toggleAllowViewResults = () => {
        setAllowViewResults(!allowViewResults);
    };

    useEffect(() => {
        fetchPollResults();
    }, [fetchPollResults]);

    useEffect(() => {
        fetchPoll();
    }, [fetchPoll]);

    return (
        <div>
            Poll has been created successfuly! Share your poll to others using the link below:
            <br />
            <a href={pollLink}>{pollLink}</a>
            <br />
            Results:
            <br />
            {pollResults &&
                Object.keys(pollResults).map((result, index) => {
                    return (
                        <div key={'field_' + index}>
                            {result}: {pollResults[result]}
                        </div>
                    );
                })}
            <br />
            Allow voters to see results
            <br />
            <button onClick={toggleAllowViewResults}>
                {allowViewResults ? 'On' : 'Off'}
            </button>
        </div>
    );
};
