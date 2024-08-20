import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PDFViewerComponent from './PDFViewerComponent'; // Ensure the import path is correct

const FullScreenPreviewModal = ({ open, onClose, url, fileType }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ position: 'relative', width: '90vw', height: '90vh', bgcolor: 'background.paper' }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                {fileType.startsWith('image/') ? (
                    <img
                        src={url}
                        alt="full-screen-preview"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                ) : fileType === 'application/pdf' ? (
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <PDFViewerComponent url={url} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body1" color="textSecondary">
                            Unsupported file type
                        </Typography>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default FullScreenPreviewModal;
