import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('Checking...');
  const [color, setColor] = useState('text-warning');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const checkConnection = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/health`);
      if (res.data.status === 'OK') {
        setStatus('✅ Backend Connected');
        setColor('text-success');
      } else {
        setStatus('❌ Backend Error');
        setColor('text-danger');
      }
    } catch (error) {
      setStatus('❌ Backend Offline');
      setColor('text-danger');
      console.error('Backend connection error:', error.message);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`fw-bold ${color} small`}>
      <i className={`fas ${status.includes('✅') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-1`}></i>
      {status}
    </span>
  );
};

export default ConnectionStatus;