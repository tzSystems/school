import React from 'react';
import { Box } from '@mui/material';
import SenderMessage from './SenderMessage';
import RecipientMessage from './RecipientMessage';

const MessageList = ({ messages, senderId, recipientName }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message.senderId === senderId ? (
            <SenderMessage message={message.content} attachment={message.attachment} />
          ) : (
            <RecipientMessage message={message.content} attachment={message.attachment} recipientName={recipientName} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MessageList;
