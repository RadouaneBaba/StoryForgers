import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'https://story-forgers-server.glitch.me' : 'http://localhost:3001';
//const URL = 'storyforgers-server.glitch.me/socket.io/?EIO=4&transport=websocket';
//const URL = 'https://story-forgers-server.glitch.me';
export const socket = io(URL, {
    autoConnect: false,
});