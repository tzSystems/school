import React from 'react';
import { Box, Typography } from '@mui/material';

const SenderMessage = ({ message, attachment }) => {
  return (
    <Box 
      sx={{ 
        alignSelf: 'flex-end', 
        backgroundColor: '#DCF8C6', 
        borderRadius: '10px', 
        margin: '5px 0', 
        padding: '10px', 
        maxWidth: '60%',
        position: 'relative' 
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ position: 'absolute', top: '-20px', right: '10px', fontSize: '12px' }}>
        It's me
      </Typography>
      <Typography variant="body1">{message}</Typography>
      {attachment?.url && (
        <Box sx={{ marginTop: '10px' }}>
          <img src={attachment.url} alt="attachment" style={{ maxWidth: '100%', borderRadius: '5px' }} />
        </Box>
      )}
    </Box>
  );
};

export default SenderMessage;
