

import React from 'react';
import { Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const AttachmentPreview = ({ previewUrl, onRemove, onExpand }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ position: 'relative', cursor: 'pointer', width: 100, height: 100 }}>
                <img
                    src={previewUrl}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    onClick={() => onExpand(previewUrl)}
                />
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
