import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Search, 
  X, 
  Trash2, 
  Send, 
  Copy, 
  Lightbulb, 
  SearchIcon, 
  Sparkles, 
  BarChart3,
  MessageCircle,
  Loader2,
  User,
  Bot
} from 'lucide-react';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const chats = await response.json();
        // Convert backend chat format to frontend message format
        const formattedMessages = [];
        chats.forEach(chat => {
          // Add user message
          formattedMessages.push({
            id: `user-${chat._id}`,
            text: chat.prompt,
            sender: 'user',
            timestamp: new Date(chat.createdAt)
          });
          // Add AI response
          formattedMessages.push({
            id: `bot-${chat._id}`,
            text: chat.response,
            sender: 'bot',
            timestamp: new Date(chat.createdAt)
          });
        });
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message immediately for better UX
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = newMessage;
    setNewMessage('');
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: messageToSend })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
      // Remove the user message if it failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setNewMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion);
    textareaRef.current?.focus();
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const clearChatHistory = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        setMessages([]);
        // You can add an API call here to delete all chats from backend if needed
      } catch (err) {
        console.error('Failed to clear chat history:', err);
      }
    }
  };

  const suggestions = [
    {
      icon: <Lightbulb size={20} />,
      text: 'Explain a complex concept',
      description: 'Get clear explanations'
    },
    {
      icon: <SearchIcon size={20} />,
      text: 'Help me research a topic',
      description: 'Find information quickly'
    },
    {
      icon: <Sparkles size={20} />,
      text: 'Generate creative ideas',
      description: 'Brainstorm solutions'
    },
    {
      icon: <BarChart3 size={20} />,
      text: 'Analyze data or trends',
      description: 'Get insights'
    }
  ];

  return (
    <div className="chat-app">
      {/* Search Bar */}
      <div className="search-header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="search-close">
                <X size={14} />
              </button>
            )}
          </div>
          <button 
            onClick={clearChatHistory} 
            className="clear-history-btn"
            title="Clear chat history"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <main className="chat-main">
        <div className="messages-container">
          {filteredMessages.length === 0 && !searchTerm ? (
            <div className="empty-state">
              <div className="empty-icon">
                <MessageCircle size={64} />
              </div>
              <h2>Start a conversation</h2>
              <p>Ask me anything! I'm here to help with questions, creative tasks, analysis, and more.</p>
              
              <div className="suggestion-grid">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="suggestion-card"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <span className="suggestion-icon">{suggestion.icon}</span>
                    <div>
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                        {suggestion.text}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                        {suggestion.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {filteredMessages.map((message) => (
                <div key={message.id} className={`message ${message.sender}-message`}>
                  <div className="message-avatar">
                    {message.sender === 'user' ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">
                      {message.sender === 'bot' ? (
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      ) : (
                        message.text
                      )}
                    </div>
                    <div className="message-time">
                      {formatTime(message.timestamp)}
                    </div>
                    {message.sender === 'bot' && (
                      <div className="message-actions">
                        <button 
                          className="action-btn copy-btn"
                          onClick={() => copyMessage(message.text)}
                          title="Copy message"
                        >
                          <Copy size={12} />
                          Copy
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => deleteMessage(message.id)}
                          title="Delete message"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message ai-message typing">
                  <div className="message-avatar">
                    <Bot size={18} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <Loader2 size={16} className="typing-spinner" />
                      <span className="typing-text">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          {error && (
            <div className="error-banner">
              <X size={16} />
              {error}
              <button onClick={() => setError('')} className="error-close">
                <X size={14} />
              </button>
            </div>
          )}
          
          <div className="input-container">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="message-input"
                disabled={isLoading}
                rows={1}
              />
              
              <div className="input-actions">
                <div className="input-info">
                  <span className="char-count">
                    {newMessage.length}/2000
                  </span>
                  <span className="input-hint">
                    Press Enter to send • Shift+Enter for new line
                  </span>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isLoading || newMessage.length > 2000}
                  className="send-btn"
                  title="Send message"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="send-spinner" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
