'use client';

import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { get } from 'mongoose';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.status === 200) {
          const data = await res.data;
          setMessages(data);
        }
      } catch (error) {
        console.log('Error getting messages', error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return <div>Messages</div>;
};

export default Messages;
