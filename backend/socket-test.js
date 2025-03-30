const io = require('socket.io-client');

// Connect to the backend Socket.IO server
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to the Socket.IO server');
});

// Listen for notifications
socket.on('notification', (data) => {
  console.log('Notification received:', data);
});
