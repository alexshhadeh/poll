import { TextField, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { CopyToClipboard as CTC } from 'react-copy-to-clipboard';

export const CopyToClipboard = ({ text, disabled }) => {
  const [url, setUrl] = useState(text);

  const [openSnackbar, setSnackbarOpen] = React.useState(false);

  const handleCopy = () => {
    window.navigator.vibrate(200);
    setSnackbarOpen(true);
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
      <Button variant="contained">
        <CTC text={url} onCopy={handleCopy}>
          <span>Copy to clipboard</span>
        </CTC>
      </Button>
    </div>
  );
};
