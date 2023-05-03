import { css } from '@emotion/react';

export const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  `,
  logo: css`
    width: 128px;
    height: 128px;
    margin-bottom: 32px;
  `,
  input: css`
    margin-bottom: 16px;
  `,
  button: css`
    margin-top: 16px;
    margin-bottom: 8px;
  `,
  avatar: css`
    margin-top: 16px;
    margin-bottom: 8px;
  `,
  divider: css`
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    text-align: center;
    & > p {
      font-size: 14px;
      font-weight: 500;
    }
  `,
  socialButton: css`
    margin-right: 8px;
  `,
  or: css`
    margin-top: 16px;
    margin-bottom: 8px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    & > a {
      color: #3f51b5;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  `,
};
