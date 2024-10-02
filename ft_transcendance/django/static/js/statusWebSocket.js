import { the_user } from './crud/the_user.js';

let statusConnection = null;

function initialize_Status_Socket() {
    const protocols = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const hosts = window.location.host;
    const statusSocketUrl = `${protocols}${hosts}/ws/status/${the_user.id}/`;

    // Check if the WebSocket connection status is already established
    if (statusConnection && statusConnection.readyState === WebSocket.OPEN) {
        console.log('WebSocket for user status is already active');
        return;
    }

   // Date of existing WebSocket connection, time
    if (statusConnection) {
        statusConnection.close();
    }

    statusConnection = new WebSocket(statusSocketUrl);

    statusConnection.onopen = function() {
        console.log('WebSocket for user status successfully connected');
    };

    statusConnection.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log('Received data via WebSocket for user status:', data);
    };

    statusConnection.onclose = function(e) {
        console.log('WebSocket for user status has been disconnected:', e);
    };

    statusConnection.onerror = function(e) {
        console.error('Error occurred in WebSocket for user status:', e);
    };
}

function close_Status_Socket() {
    if (statusConnection) {
        statusConnection.close();
        statusConnection = null;
        console.log('WebSocket for user status has been terminated');
    }
}

export { initialize_Status_Socket, close_Status_Socket };
