import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    resetMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => {
      if (typeof resetMessages === 'function') resetMessages(); // Safety check
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current && isAtBottom) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    setIsAtBottom(container.scrollHeight - container.scrollTop === container.clientHeight);
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Show skeleton loading while messages are loading
  if (isMessagesLoading || !selectedUser?._id) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto relative" ref={chatContainerRef}>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            authUser={authUser}
            selectedUser={selectedUser}
            setSelectedImage={setSelectedImage}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput />
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-1 z-50"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="full-size"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Message = React.memo(({ message, authUser, selectedUser, setSelectedImage }) => (
  <div className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
    <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img
          src={
            message.senderId === authUser._id
              ? authUser.profilePic || '/avatar.png'
              : selectedUser.profilePic || '/avatar.png'
          }
          alt="profile pic"
        />
      </div>
    </div>
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
    </div>
    <div className="chat-bubble flex flex-col">
      {message.image && (
        <img
          src={message.image}
          alt="attachment"
          className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
          onClick={() => setSelectedImage(message.image)}
        />
      )}
      {message.text && <p>{message.text}</p>}
    </div>
  </div>
));

export default ChatContainer;
