

import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FullScreenPreviewModal = ({ open, onClose, url }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <img
                    src={url}
                    alt="full-screen-preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </Box>
        </Modal>
    );
};

export default FullScreenPreviewModal;
