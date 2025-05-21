import React, { useEffect, useState, useRef } from 'react';
import API from '../api';
import ReactMarkdown from 'react-markdown';
import '../styles/Chat.css';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null); // to scroll

  // Fetch chats only if token exists
  const fetchChats = async () => {
    if (!localStorage.getItem('token')) return;

    try {
      const res = await API.get('/chats');
      setChats(res.data);
    } catch (err) {
      console.error('Failed to load chats:', err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Scroll chat box to bottom whenever chats change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats]);

  // Send a new message
  const handleSend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await API.post('/chats', { prompt });
      // Append new chat at the end of the array
      setChats([...chats, res.data]);
      setPrompt('');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  // Delete a chat
  const handleDelete = async (id) => {
    try {
      await API.delete(`/chats/${id}`);
      setChats(chats.filter(chat => chat._id !== id));
    } catch (err) {
      alert('Failed to delete chat');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {chats.map((chat) => (
          <div key={chat._id} className="chat-item">
            <div className="chat-user">
              <strong>You:</strong> {chat.prompt}
            </div>
            <div className="chat-ai">
              <strong>AI:</strong>
              <ReactMarkdown>{chat.response}</ReactMarkdown>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(chat._id)}>🗑</button>
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask something..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !prompt.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
