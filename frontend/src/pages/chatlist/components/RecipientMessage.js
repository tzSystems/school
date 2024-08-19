import React from 'react';
import { Box, Typography } from '@mui/material';

const RecipientMessage = ({ message, attachment, recipientName }) => {
  return (
    <Box 
      sx={{ 
        alignSelf: 'flex-start', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '10px', 
        margin: '5px 0', 
        padding: '10px', 
        maxWidth: '60%', 
        position: 'relative',
        border: '1px solid #E6E6E6',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {attachment?.url ? (
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            fontSize: '12px',
            backgroundColor: '#F0F0F0',
            padding: '2px 5px',
            borderRadius: '5px'
          }}
        >
          -{recipientName}
        </Typography>
      ) : (
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ 
            marginBottom: '10px', 
            textAlign: 'right',
            fontSize: '12px',
            fontStyle: 'italic'
          }}
        >
          -{recipientName}
        </Typography>
      )}
      <Typography variant="body1">{message}</Typography>
      {attachment?.url && (
        <Box sx={{ marginTop: '10px' }}>
          <img 
            src={attachment.url} 
            alt="attachment" 
            style={{ 
              maxWidth: '100%', 
              borderRadius: '5px' 
            }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipientMessage;
