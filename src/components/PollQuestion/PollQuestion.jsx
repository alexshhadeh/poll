import { Typography } from '@mui/material';
import { css } from '@emotion/react';

export const styles = {
  question: css`
    margin: 30px 0;
    text-align: center;
  `,
};

export const PollQuestion = ({ pollTitle }) => {
  return (
    <Typography variant="h4" css={styles.question}>
      {pollTitle}
    </Typography>
  );
};
