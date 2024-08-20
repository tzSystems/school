import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ChatHeader from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import AttachmentPreview from './components/AttachmentPreview';
import FullScreenPreviewModal from './components/FullScreenPreviewModal';
import UploadProgress from './components/UploadProgress';
import { sendMessage, fetchMessagesBySenderAndRecipient } from '../../redux/messageRelated/messageHandle';
import { createChatList } from '../../redux/chatlistRelated/chatlistHandle';
import { useParams } from 'react-router-dom';
import { uploadToCloudinary } from '../../utils';

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
  const [fileType, setFileType] = useState(null); // Track file type
  const [fullScreenPreview, setFullScreenPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    dispatch(fetchMessagesBySenderAndRecipient({ senderId, recipientId, senderRole }));
    dispatch(createChatList({ senderId, recipientId, recipientName, recipientRole }));
  }, [dispatch, senderId, recipientId, recipientName, recipientRole]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    const content = messageRef.current.value;
    if (content.trim() || attachment) {
      let attachmentData = null;
      if (attachment) {
        const preset = fileType.startsWith('image/') ? 'image_preset' : 'document_preset';
        try {
          const uploadResult = await uploadToCloudinary(attachment, preset, setUploadProgress);
          attachmentData = { url: uploadResult.secureUrl,name:uploadResult.display_name, type: uploadResult.mimeType, publicId: uploadResult.publicId };
          console.log('attachments', attachmentData);
          console.log('uploadResult', uploadResult);
        } catch (error) {
          console.error('Upload failed:', error);
          return;
        }
      }
      dispatch(sendMessage({ senderId, recipientId, content, attachment: attachmentData, role: senderRole }));
      messageRef.current.value = '';
      setAttachment(null);
      setPreviewUrl(null);
      setFileType(null); // Reset fileType
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type); // Set file type
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setPreviewUrl(null);
    setFileType(null); // Reset fileType
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
      {previewUrl && uploadProgress === 0 && (
        <AttachmentPreview
          previewUrl={previewUrl}
          fileType={fileType} // Pass file type to AttachmentPreview
          onRemove={handleRemoveAttachment}
          onExpand={handleExpandPreview}
        />
      )}
      {uploadProgress > 0 && (
        <UploadProgress
          file={attachment}
          progress={uploadProgress}
          onCancel={() => setAttachment(null)}
        />
      )}
      <MessageInput
        onSend={handleSend}
        onFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        messageRef={messageRef}
      />
      <Box ref={chatEndRef} />
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
