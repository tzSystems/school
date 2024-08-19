import React from 'react';
import { Box } from '@mui/material';

const AttachmentPreview = ({ previewUrl, onRemove, onSend, onFullScreen }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 1 }}>
        <img
            src={previewUrl}
            alt="preview"
            style={{ maxWidth: '100%', borderRadius: '8px', cursor: 'pointer' }}
            onClick={onFullScreen}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={onRemove}>Remove</button>
            <button onClick={onSend}>Send</button>
        </Box>
    </Box>
);

export default AttachmentPreview;
