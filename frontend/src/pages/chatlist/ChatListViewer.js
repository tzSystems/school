import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Paper, IconButton, TextField, Tooltip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChatListsForUser } from '../../redux/chatlistRelated/chatlistHandle';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

const ChatListViewer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chatLists, loading, error } = useSelector(state => state.chatList);
    const { currentUser } = useSelector(state => state.user);

    const userId = currentUser._id;
    const role = currentUser.role;

    const [showSearch, setShowSearch] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        if (userId && role) {
            dispatch(fetchChatListsForUser({ userId, role }))
                .then(result => {
                    console.log('Chat lists fetched', result);
                })
                .catch(err => {
                    console.error('Error fetching chat lists:', err);
                });
        }
    }, [dispatch, userId, role]);

    const handleChatClick = (chat) => {
        const recipient = chat.participants.find(participant => participant.userId !== currentUser._id);
        navigate(`/chatlist/${recipient.userId}/${recipient.name}/${recipient.role}`);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
            {/* Header with Role Dropdown, Search, and Sort */}
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'grey.100' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Chats
                </Typography>
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

            {/* Conditionally render based on loading and error states */}
            {loading ? (
                <Typography variant="body1" sx={{ padding: 2 }}>Loading chats...</Typography>
            ) : error ? (
                <Typography variant="body1" color="error" sx={{ padding: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ overflowY: 'auto', height: 'calc(100% - 64px)' }}> {/* Adjust height for the header */}
                    {chatLists.map(chat => (
                        <ListItem
                            key={chat._id}
                            button
                            alignItems="flex-start"
                            onClick={() => handleChatClick(chat)}
                        >
                            <ListItemAvatar>
                                <Avatar alt={chat.recipient?.name || 'Anonymous'} src={chat.recipient?.avatarUrl || ''} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat.recipient?.name || 'Anonymous'}
                                secondary={
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {chat.lastMessage.sender?.name || 'You'}:
                                        </Typography>
                                        {` ${chat.lastMessage.content}`}
                                    </>
                                }
                            />
                            <Typography variant="caption" color="textSecondary">
                                {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ChatListViewer;
