import React, { useState, useRef } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentOptionsModal from './AttachmentOptionsModal'; // Import the modal component

const MessageInput = ({ onSend, onFileChange, fileInputRef, messageRef }) => {
    const [optionsModalOpen, setOptionsModalOpen] = useState(false);
    const [attachmentType, setAttachmentType] = useState(null);

    const handleOpenOptionsModal = () => {
        setOptionsModalOpen(true);
    };

    const handleSelectAttachmentType = (type) => {
        setAttachmentType(type);
        setOptionsModalOpen(false);
        fileInputRef.current.accept = type === 'image' ? 'image/*' : 'application/*';
        fileInputRef.current.click();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <IconButton onClick={handleOpenOptionsModal} sx={{ marginRight: 2 }}>
                    <AttachFileIcon />
                </IconButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                    accept={attachmentType === 'image' ? 'image/*' : 'application/*'}
                />
                <TextField
                    variant="outlined"
                    placeholder="Type your message..."
                    inputRef={messageRef}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={onSend} edge="end">
                                    <SendIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <AttachmentOptionsModal
                open={optionsModalOpen}
                onClose={() => setOptionsModalOpen(false)}
                onSelect={handleSelectAttachmentType}
            />
        </Box>
    );
};

export default MessageInput;
