import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageViewerComponent from './ImageViewerComponent';
import PDFViewerComponent from './PDFViewerComponent';
import DownloadButton from './DownloadButton';

const RecipientMessage = ({ message, attachment, recipientName, name }) => {
  return (
    <Box 
      sx={{ 
        alignSelf: 'flex-start', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '10px', 
        margin: '5px 0', 
        padding: '10px',
        minWidth: '40%',
        maxWidth: '60%', 
        position: 'relative',
        border: '1px solid #E6E6E6',
        display: 'flex',
        flexDirection: 'column',
        wordBreak: 'break-word', // Handle long words or URLs
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        },
      }}
    >
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
      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        {message}
      </Typography>
      {attachment?.url && (
        <Box sx={{ marginTop: '10px', position: 'relative' }}>
          {attachment.type.startsWith('image/') && (
            <ImageViewerComponent url={attachment.url} />
          )}
          {attachment.type === 'application/pdf' && (
            <Box
              sx={{
                height: '500px', // Adjust height as needed
                width: '100%',
                maxWidth: '300px', // Adjust width as needed
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '4px',
                position: 'relative',
                bgcolor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PDFViewerComponent url={attachment.url} />
              <DownloadButton url={attachment.url} />
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  position: 'absolute',
                  bottom: '40px',
                  textAlign: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {name || 'Document'}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RecipientMessage;
