import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatListsForUser } from '../../redux/chatlistRelated/chatlistHandle'; // Import the action to fetch chat lists

const ChatListViewer = () => {
    const dispatch = useDispatch();
    const { chatLists, loading, error } = useSelector(state => state.chatList); // Access chat lists from the Redux state
    const { currentUser } = useSelector(state => state.user); // Access current user from the Redux state

    const userId = currentUser._id;
    const role = currentUser.role;

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

    return (
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
            {/* Header for the chat list */}
            <Typography variant="h5" sx={{ padding: 2, borderBottom: '1px solid #e0e0e0' }}>
                Chats
            </Typography>

            {/* Conditionally render based on loading and error states */}
            {loading ? (
                <Typography variant="body1" sx={{ padding: 2 }}>Loading chats...</Typography>
            ) : error ? (
                <Typography variant="body1" color="error" sx={{ padding: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ overflowY: 'auto', height: 'calc(100% - 64px)' }}> {/* Adjust height for the header */}
                    {chatLists.map(chat => (
                        <ListItem key={chat._id} button alignItems="flex-start">
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
