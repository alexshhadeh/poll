import React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

import { Poll } from '../../poll/poll';
import { routes } from '../../../routes';
import { styles } from './styles';
import { PollQuestion } from '../../components/PollQuestion/PollQuestion';

export const PollView = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pollId = searchParams.get('id');

  const [poll, setPoll] = useState();
  const [radioValue, setRadioValue] = useState('');

  // e.g. {"green": true, "yellow": false }
  const [isCheckedByOptionNameMap, setIsCheckedByOptionNameMap] = useState({});

  const getChoiceMap = useCallback(async () => {
    return await poll?.fields?.reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});
  }, [poll?.fields]);

  const handleCheckboxChange = useCallback((_, optionName) => {
    setIsCheckedByOptionNameMap((prevMap) => ({
      ...prevMap,
      [optionName]: !prevMap[optionName],
    }));
  }, []);

  const handleRadioChange = useCallback((event) => {
    const optionName = event.target.value;
    setIsCheckedByOptionNameMap((prevMap) => {
      const newMap = {};
      for (const key in prevMap) {
        if (key === optionName) {
          newMap[key] = !prevMap[key];
        } else {
          newMap[key] = false;
        }
      }
      return newMap;
    });
    setRadioValue(optionName);
  }, []);

  const fetchOptionNames = useCallback(async () => {
    if (poll && poll.fields) {
      const result = await poll?.fields?.reduce((acc, cur) => {
        acc[cur] = false;
        return acc;
      }, {});
      setIsCheckedByOptionNameMap(result);
    }
  }, [poll]);

  const voteResult = useMemo(
    () =>
      Object.keys(isCheckedByOptionNameMap).reduce((acc, color) => {
        acc[color] = isCheckedByOptionNameMap[color] ? 1 : 0;
        return acc;
      }, {}),
    [isCheckedByOptionNameMap]
  );

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    const fetchPoll = async () => {
      const poll = await Poll.poll(pollId);
      setPoll(poll);
    };

    fetchPoll();
  }, [pollId]);

  useEffect(() => {
    fetchOptionNames();
  }, [fetchOptionNames, getChoiceMap, poll]);

  return (
    <Box sx={styles.mainBox}>
      {poll ? (
        <>
          <PollQuestion pollTitle={poll?.title} />
          <FormControl component="fieldset">
            <FormGroup>
              {poll?.fields.map((field, index) => {
                const key = `field_${index}`;
                return (
                  <Box key={key} css={styles.fields}>
                    {poll?.allow_multiselect ? (
                      <FormControlLabel
                        label={field}
                        labelPlacement="start"
                        control={
                          <Checkbox
                            checked={!!isCheckedByOptionNameMap[field]}
                            onChange={(event) =>
                              handleCheckboxChange(event, field)
                            }
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                      />
                    ) : (
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value={field}
                          control={<Radio />}
                          label={field}
                        />
                      </RadioGroup>
                    )}
                  </Box>
                );
              })}
            </FormGroup>
            <br />
            <Button
              variant="contained"
              onClick={async () => {
                await Poll.vote(pollId, voteResult);
                navigate(routes.pollResultsViewById(pollId));
              }}
              css={styles.button}
            >
              Submit
            </Button>
          </FormControl>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
