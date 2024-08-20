import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageViewerComponent from './ImageViewerComponent';
import DownloadButton from './DownloadButton';

const SenderMessage = ({ message, attachment }) => {
    const handleClick = () => {
        if (attachment?.url) {
            window.open(attachment.url, '_blank');
        }
    };

    return (
        <Box
            sx={{
                alignSelf: 'flex-end',
                backgroundColor: '#DCF8C6',
                borderRadius: '10px',
                margin: '5px 0',
                padding: '10px',
                minWidth: '40%',
                maxWidth: '60%',
                position: 'relative',
                wordBreak: 'break-word',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                },
            }}
            onClick={handleClick}
        >
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    position: 'absolute',
                    top: '-20px',
                    right: '10px',
                    fontSize: '12px',
                    backgroundColor: '#ffffff',
                    padding: '2px 4px',
                    borderRadius: '4px',
                }}
            >
                It's me
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                {message}
            </Typography>
            {attachment?.url && (
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    {attachment.type.startsWith('image/') && (
                        <ImageViewerComponent url={attachment.url} />
                    )}
                    {attachment.type === 'application/pdf' && (
                        <Box
                            sx={{
                                height: '100px', // Adjust height as needed
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
                                    fontSize: '14px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                }}
                            >
                                {attachment.name || "Documemt"}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SenderMessage;
