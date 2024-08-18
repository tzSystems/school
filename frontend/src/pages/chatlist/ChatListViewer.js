import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Paper, IconButton, TextField, Tooltip, FormControl, InputLabel, Select, MenuItem, Menu, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChatListsForUser } from '../../redux/chatlistRelated/chatlistHandle';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllParents } from '../../redux/parentRelated/parentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const ChatListViewer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chatLists, loading, error } = useSelector(state => state.chatList);
    const { currentUser } = useSelector(state => state.user);

    const userId = currentUser._id;
    const role = currentUser.role;

    const [showSearch, setShowSearch] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Parent');
    const [showDropdown, setShowDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [names, setNames] = useState([]);

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
        
        console.log('recipient id in chatListViewer', recipient)
        navigate(`/chatlist/${recipient._id}/${recipient.name}/${recipient.role}`);
    };

    const handleAddClick = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);

        if (selectedRole === 'Parent') {
            dispatch(getAllParents(userId))
                .then(response => {
                    setNames(response.map(parent => ({ id: parent._id, name: parent.name, role: 'Parent' })));
                })
                .catch(err => console.error('Error fetching parents:', err));
        } else if (selectedRole === 'Teacher') {
            dispatch(getAllTeachers(userId))
                .then(response => {
                    setNames(response.map(teacher => ({ id: teacher._id, name: teacher.name, role: 'Teacher' })));
                })
                .catch(err => console.error('Error fetching teachers:', err));
        } else if (selectedRole === 'Student') {
            dispatch(getAllStudents(userId))
                .then(response => {
                    setNames(response.map(student => ({ id: student._id, name: student.name, role: 'Student' })));
                })
                .catch(err => console.error('Error fetching students:', err));
        }
    };

    const handleNameSelect = (selectedName) => {
        const { id: recipientId, name, role: recipientRole } = selectedName;

        console.log('Recipient Role in chat list viewer:', recipientRole);
        console.log('Recipient ID:', recipientId);
        console.log('Current User Role:', role);
        console.log('Current User ID:', userId);

        navigate(`/chatlist/${recipientId}/${name}/${recipientRole}`);

        setShowDropdown(false);
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'grey.100' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Chats
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={selectedRole}
                            label="Role"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value="Parent">Parents</MenuItem>
                            <MenuItem value="Teacher">Teachers</MenuItem>
                            <MenuItem value="Student">Students</MenuItem>
                        </Select>
                    </FormControl>

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

                    <Tooltip title="Sort">
                        <IconButton sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { bgcolor: 'secondary.dark' } }}>
                            <SortIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Add New Chat">
                        <IconButton
                            onClick={handleAddClick}
                            sx={{ bgcolor: 'success.main', color: 'success.contrastText', '&:hover': { bgcolor: 'success.dark' } }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={showDropdown}
                        onClose={() => setShowDropdown(false)}
                        PaperProps={{
                            style: {
                                maxHeight: 200,
                                width: '20ch',
                            },
                        }}
                    >
                        {names.map((nameObj) => (
                            <MenuItem key={nameObj.id} onClick={() => handleNameSelect(nameObj)}>
                                {nameObj.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Paper>

            {loading ? (
                <Typography variant="body1" sx={{ padding: 2 }}>Loading chats...</Typography>
            ) : error ? (
                <Typography variant="body1" color="error" sx={{ padding: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ overflowY: 'auto', height: 'calc(100% - 64px)' }}>
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
                                primary={
                                    <>
                                        {chat.participants[1]?.name || 'Anonymous'}
                                        <Chip
                                            label={chat.participants[1]?.role || 'Unknown'}
                                            size="small"
                                            sx={{ ml: 1, bgcolor: 'grey.300', borderRadius: '12px' }}
                                        />
                                    </>
                                }
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
