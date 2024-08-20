import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ url }) => {
    const handleDownload = () => {
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Extract the file name from the URL
        link.click();
    };

    return (
        <Tooltip title="Download" arrow>
            <IconButton
                onClick={handleDownload}
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    bgcolor: '#ffffff',
                    borderRadius: '50%',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    '&:hover': {
                        bgcolor: '#f0f0f0',
                    },
                }}
            >
                <DownloadIcon sx={{ color: '#007bff' }} />
            </IconButton>
        </Tooltip>
    );
};

export default DownloadButton;
