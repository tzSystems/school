import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ChatHeader from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import AttachmentPreview from './components/AttachmentPreview';
import FullScreenPreviewModal from './components/FullScreenPreviewModal';
import { sendMessage, fetchMessagesBySenderAndRecipient } from '../../redux/messageRelated/messageHandle';
import { createChatList } from '../../redux/chatlistRelated/chatlistHandle';
import { useParams } from 'react-router-dom';

const ChatViewerPage = () => {
    const messageRef = useRef(null);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const { recipientId, recipientName, recipientRole } = useParams();
    const messages = useSelector((state) => state.messages.messages);
    const loading = useSelector((state) => state.messages.loading);
    const error = useSelector((state) => state.messages.error);
    const { currentUser } = useSelector((state) => state.user);
    const senderId = currentUser._id;
    const senderRole = currentUser.role;
    const [attachment, setAttachment] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fullScreenPreview, setFullScreenPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchMessagesBySenderAndRecipient({ senderId, recipientId , senderRole}));
        dispatch(createChatList({ senderId, recipientId, recipientName, recipientRole }));
    }, [dispatch, senderId, recipientId, recipientName, recipientRole]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = () => {
        const content = messageRef.current.value;
        if (content.trim() || attachment) {
            dispatch(sendMessage({ senderId, recipientId, content, attachment, role:senderRole }));
            messageRef.current.value = '';
            setAttachment(null);
            setPreviewUrl(null);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveAttachment = () => {
        setAttachment(null);
        setPreviewUrl(null);
    };

    const handleExpandPreview = (url) => {
        setFullScreenPreview(url);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFullScreenPreview(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ChatHeader recipientName={recipientName} />
            <MessageList messages={messages} senderId={senderId} recipientName={recipientName} />
            <Box ref={chatEndRef} />
            <MessageInput
                onSend={handleSend}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
                messageRef={messageRef}
            />
            {previewUrl && (
                <AttachmentPreview
                    previewUrl={previewUrl}
                    onRemove={handleRemoveAttachment}
                    onExpand={handleExpandPreview}
                />
            )}
            {fullScreenPreview && (
                <FullScreenPreviewModal
                    open={showModal}
                    onClose={handleCloseModal}
                    url={fullScreenPreview}
                />
            )}
        </Box>
    );
};

export default ChatViewerPage;
