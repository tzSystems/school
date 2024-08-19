

import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

const AttachmentOptionsModal = ({ open, onClose, onSelect }) => {
    const handleSelect = (type) => {
        onSelect(type);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ width: 300, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Select Attachment Type</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    <ListItem button onClick={() => handleSelect('image')}>
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </ListItem>
                    <ListItem button onClick={() => handleSelect('document')}>
                        <ListItemIcon>
                            <InsertDriveFileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Document" />
                    </ListItem>
                </List>
            </Box>
        </Modal>
    );
};

export default AttachmentOptionsModal;
