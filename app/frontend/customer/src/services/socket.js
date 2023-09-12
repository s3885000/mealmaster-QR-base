import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('WebSocket connected with id:', socket.id);
  });
  
  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected due to:', reason);
  });
  
  socket.on('error', (error) => {
    console.error("WebSocket Error:", error);
  });

export default socket;