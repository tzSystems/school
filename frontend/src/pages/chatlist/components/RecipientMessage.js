

import React from 'react';
import { Box, Typography } from '@mui/material';

const RecipientMessage = ({ message, attachment }) => {
  return (
    <Box sx={{ alignSelf: 'flex-start', backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '10px', margin: '5px 0', padding: '10px', maxWidth: '60%' }}>
      <Typography variant="body1">{message}</Typography>
      {attachment?.url && (
        <Box sx={{ marginTop: '10px' }}>
          <img src={attachment.url} alt="attachment" style={{ maxWidth: '100%', borderRadius: '5px' }} />
        </Box>
      )}
    </Box>
  );
};

export default RecipientMessage;
