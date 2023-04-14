import React from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import { Poll } from '../../poll/poll'

const style = css`
  color: hotpink;
`;

const color = 'white';



export const HomeView = () => {

  return (
    <div>
      <Button variant="contained" onClick={
        () => {
          const test_poll_args = {
            userId: '12345',
            title: "Is poll working?",
            fields: ['water', 'tea', 'coffe'],
            allow_multiselect: false
          }
          Poll.create(
            test_poll_args.userId,
            test_poll_args.title,
            test_poll_args.fields,
            test_poll_args.allow_multiselect,
          )
        }
      }>Hello World</Button>
      <h1 css={style}>Home View</h1>
      <div
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>
    </div>
  );
};
