import { TextField, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
// import copy from 'copy-to-clipboard';
import * as copy from 'copy-to-clipboard';

export const CopyToClipboard = ({ text, disabled }) => {
  const [url, setUrl] = useState(text);

  const [openSnackbar, setSnackbarOpen] = React.useState(false);

  const handleCopy = () => {
    setSnackbarOpen(true);
    copy(url);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard
        </Alert>
      </Snackbar>
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={disabled}
        sx={{ marginBottom: '8px' }}
      />
      <Button variant="contained" onClick={handleCopy}>
        Copy to clipboard
      </Button>
    </div>
  );
};
