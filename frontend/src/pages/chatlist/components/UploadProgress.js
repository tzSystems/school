// UploadProgress.js

import React from 'react';
import { Box, Typography, LinearProgress, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const UploadProgress = ({ file, progress, onCancel }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            padding: 1, 
            border: '1px solid', 
            borderColor: 'divider', 
            bgcolor: 'background.paper', 
            borderRadius: 1, 
            maxWidth: 'calc(100% - 40px)', // Adjust width to fit within the chat window
            marginBottom: 2,
            position: 'relative'
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                position: 'relative'
            }}>
                {file.type.startsWith('image/') ? (
                    <img 
                        src={URL.createObjectURL(file)} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: 150, // Limit image height
                            objectFit: 'contain' 
                        }} 
                    />
                ) : (
                    <Typography variant="body2" sx={{ 
                        wordBreak: 'break-word', 
                        padding: 1, 
                        textAlign: 'center' 
                    }}>
                        Document: {file.name}
                    </Typography>
                )}
                <IconButton 
                    onClick={onCancel} 
                    sx={{ 
                        position: 'absolute', 
                        top: 4, 
                        right: 4, 
                        zIndex: 1 
                    }}
                >
                    <CancelIcon />
                </IconButton>
            </Box>
            {progress !== null && (
                <Box sx={{ width: '100%', marginTop: 1 }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                    />
                    <Typography 
                        variant="caption" 
                        color="textSecondary" 
                        sx={{ textAlign: 'center', marginTop: 1 }}
                    >
                        {progress}% Uploading...
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default UploadProgress;
