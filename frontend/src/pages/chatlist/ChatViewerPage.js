import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment, Paper, Avatar, Tooltip, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchMessagesBySenderAndRecipient } from '../../redux/messageRelated/messageHandle';
import { createChatList } from '../../redux/chatlistRelated/chatlistHandle';
import { useParams } from 'react-router-dom';
import { getAllParents } from '../../redux/parentRelated/parentHandle';

const ChatViewerPage = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const messageRef = useRef('');
    const dispatch = useDispatch();
    const { recipientId, recipientName, recipientRole } = useParams();
    const messages = useSelector((state) => state.messages.messages);
    const loading = useSelector((state) => state.messages.loading);
    const error = useSelector((state) => state.messages.error);
    const { currentUser } = useSelector((state) => state.user);
    const senderId = currentUser._id;
    const senderRole = currentUser.role;

    useEffect(() => {
        if (recipientId) {
            dispatch(fetchMessagesBySenderAndRecipient({ recipientId, senderId, senderRole }));
        }
    }, [dispatch, recipientId, senderId, senderRole]);

    const handleSend = () => {
        const message = messageRef.current.value.trim();
        if (message && recipientId) {
            dispatch(sendMessage({ recipientId, content: message, senderId, recipientRole, role: senderRole }))
                .then((result) => {
                    if (result && result.data) {
                        dispatch(createChatList({
                            participants: [
                                { userId: senderId, role: senderRole },
                                { userId: recipientId, role: recipientRole }
                            ],
                            firstMessage: { content: message, senderId: senderId, senderRole: senderRole }
                        }));
                        messageRef.current.value = '';
                    } else {
                        console.error('Failed to send message:', result);
                    }
                })
                .catch((error) => {
                    console.error('Error sending message or creating chat list:', error);
                });
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            {/* Header with Recipient's Name and Action Buttons */}
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'grey.100' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={recipientName} src="/static/images/avatar/1.jpg" sx={{ marginRight: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {recipientName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Dropdown for role selection */}
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={selectedRole}
                            label="Role"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value="Parents">Parents</MenuItem>
                            <MenuItem value="Teachers">Teachers</MenuItem>
                            <MenuItem value="Students">Students</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Search button and input field */}
                    <Tooltip title="Search">
                        <IconButton
                            onClick={() => setShowSearch(!showSearch)}
                            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                    {showSearch && (
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            sx={{ marginLeft: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                        />
                    )}

                    {/* Sort button */}
                    <Tooltip title="Sort">
                        <IconButton sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { bgcolor: 'secondary.dark' } }}>
                            <SortIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Add button */}
                    <Tooltip title="Add New Chat">
                        <IconButton sx={{ bgcolor: 'success.main', color: 'success.contrastText', '&:hover': { bgcolor: 'success.dark' } }}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>

            {/* Chat Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    gap: 1,
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                {loading ? (
                    <Typography variant="body2">Loading...</Typography>
                ) : error ? (
                    <Typography variant="body2" color="error">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Typography>
                ) : (
                    messages.slice().reverse().map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                alignSelf: msg.senderId === senderId ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                bgcolor: msg.senderId === senderId ? 'primary.main' : 'grey.300',
                                color: msg.senderId === senderId ? 'primary.contrastText' : 'text.primary',
                                padding: 1.5,
                                borderRadius: 2,
                                borderTopLeftRadius: msg.senderId === senderId ? 2 : 0,
                                borderTopRightRadius: msg.senderId === senderId ? 0 : 2,
                                boxShadow: 1,
                            }}
                        >
                            <Typography variant="body2">
                                {msg.content}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: 0.5 }}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    ))
                )}
            </Box>

            {/* Input Bar */}
            <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', borderTop: '1px solid #e0e0e0', bgcolor: 'background.default' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message..."
                    inputRef={messageRef}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton component="label">
                                    <AttachFileIcon />
                                    <input type="file" hidden />
                                </IconButton>
                                <IconButton onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};

export default ChatViewerPage;
