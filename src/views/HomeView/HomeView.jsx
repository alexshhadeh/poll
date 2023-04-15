import React from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

const style = css`
  color: hotpink;
`;

const color = 'white';



export const HomeView = () => {

  return (
    <div>
      <Button variant="contained" >Hello World</Button>
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
