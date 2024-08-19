

import React from 'react';
import { Box, Typography, IconButton, Avatar, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ recipientName, onBack }) => {
    const navigate = useNavigate();

    return (
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'grey.100', position: 'sticky', top: 0, zIndex: 1000 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, marginRight: 2 }}>
                    {recipientName}
                </Typography>
                <Avatar alt={recipientName} src="/static/images/avatar/1.jpg" />
            </Box>
        </Paper>
    );
};

export default ChatHeader;
