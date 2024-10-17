import React, { useState, useEffect } from 'react';
import { Send, User, Zap, Video } from 'lucide-react';
import RizzAI from './RizzAI';

interface MessagingProps {
  subscription: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  unreadCount: number;
}

const Messaging: React.FC<MessagingProps> = ({ subscription }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showRizzAI, setShowRizzAI] = useState(false);

  useEffect(() => {
    // Simulating fetching conversations
    const mockConversations: Conversation[] = [
      { id: 1, name: 'Sarah', lastMessage: 'Hey, how are you?', unreadCount: 2 },
      { id: 2, name: 'Mike', lastMessage: 'Want to grab coffee sometime?', unreadCount: 0 },
      { id: 3, name: 'Emily', lastMessage: 'That sounds great!', unreadCount: 1 },
    ];
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Simulating fetching messages for the selected conversation
      const mockMessages: Message[] = [
        { id: 1, sender: "Sarah", content: "Hey, how are you?", timestamp: new Date(Date.now() - 3600000) },
        { id: 2, sender: "You", content: "I'm doing great, thanks! How about you?", timestamp: new Date(Date.now() - 3500000) },
        { id: 3, sender: "Sarah", content: "I'm good too! Any plans for the weekend?", timestamp: new Date(Date.now() - 3400000) },
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const toggleRizzAI = () => {
    setShowRizzAI(!showRizzAI);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex h-[600px]">
      <div className="w-1/3 border-r">
        <h2 className="text-xl font-semibold p-4 border-b">Conversations</h2>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                selectedConversation === conversation.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{conversation.name}</h3>
                {conversation.unreadCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {conversations.find((c) => c.id === selectedConversation)?.name}
              </h2>
              {subscription === 'premium' && (
                <button
                  onClick={() => {/* Implement video chat logic */}}
                  className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition duration-300"
                >
                  <Video size={20} />
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === 'You' ? 'bg-pink-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-r-md hover:bg-pink-600 transition duration-300"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
      {subscription === 'premium' && (
        <div className="absolute bottom-20 right-4">
          <button
            onClick={toggleRizzAI}
            className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            <Zap size={24} />
          </button>
        </div>
      )}
      {showRizzAI && subscription === 'premium' && <RizzAI onSuggestion={(suggestion) => setNewMessage(suggestion)} />}
    </div>
  );
};

export default Messaging;