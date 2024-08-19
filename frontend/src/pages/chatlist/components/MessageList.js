

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const MessageList = ({ messages, senderId, recipientName }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', gap: 1 }}>
            {messages.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: msg.senderId === senderId ? 'row-reverse' : 'row',
                        gap: 1,
                        mb: 1,
                    }}
                >
                    {msg.senderId !== senderId && (
                        <Avatar alt={recipientName} src="/static/images/avatar/2.jpg" sx={{ alignSelf: 'flex-start' }} />
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.senderId === senderId ? 'flex-end' : 'flex-start',
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
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {msg.senderId === senderId ? 'You' : recipientName}
                        </Typography>
                        <Typography variant="body2">
                            {msg.content}
                        </Typography>
                        {msg.attachment?.url && (
                            <img
                                src={msg.attachment.url}
                                alt="attachment"
                                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
                            />
                        )}
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: 0.5 }}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default MessageList;
