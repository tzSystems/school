import React from 'react';
import { Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageViewerComponent from './ImageViewerComponent';
import PDFViewerComponent from './PDFViewerComponent';

const AttachmentPreview = ({ previewUrl, fileType, onRemove, onExpand }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
            <Box 
                sx={{ 
                    position: 'relative', 
                    cursor: 'pointer',
                    maxWidth: '300px', // Set max width for PDF
                    maxHeight: '300px', // Set max height for PDF
                    width: '100%', // Allow it to be responsive
                    height: 'auto', 
                    overflow: 'hidden', 
                    borderRadius: '8px' 
                }}
            >
                {fileType.startsWith('image') && (
                    <img
                        src={previewUrl}
                        alt="preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onClick={() => onExpand(previewUrl)}
                    />
                )}
                {fileType === 'application/pdf' && (
                    <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
                        <PDFViewerComponent url={previewUrl} />
                    </Box>
                )}
                <IconButton
                    onClick={onRemove}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        borderRadius: '50%',
                    }}
                >
                    <CancelIcon sx={{ color: 'error.main' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AttachmentPreview;
