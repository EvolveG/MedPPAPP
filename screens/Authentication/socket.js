import { io } from 'socket.io-client';
import EventSource from 'react-native-event-source';

const socket = io('https://zeus-api-63pe.onrender.com', {
  path: '/socket.io',
  secure: true,
});

// Listen for the 'connect' event
socket.on('connect', () => {
  console.log('Connected to socket server');
});

// Create an EventSource to listen for server-sent events
const eventSource = new EventSource("https://zeus-api-63pe.onrender.com/api/notifications");

// Listen for SSE events
eventSource.addEventListener('message', (event) => {
  // Handle the SSE event data
  const data = JSON.parse(event.data);
  console.log('Received SSE event:', data);
});

// Export the socket and eventSource instances
export { socket, eventSource };
