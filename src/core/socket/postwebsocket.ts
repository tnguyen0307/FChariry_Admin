import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

import { FCConfig } from '../FCConfig';

let stompClient: Client | null = null;

export const connectPostWebSocket = (onMessageReceived: (message: string) => void) => {
    const socket = new SockJS(FCConfig.WS_URL);
    stompClient = Stomp.over(socket);
    stompClient.debug = (msg) => console.log('STOMP Debug:', msg);

    stompClient.connect(
        {},
        () => {
            console.log('Connected to WebSocket');
            stompClient!.subscribe('/topic/post-notifications', (message) => {
                if (message.body) {
                    onMessageReceived(message.body);
                }
            });
        },
        (error) => {
            console.error('WebSocket connection error:', error);
        },
    );
};

export const disconnectPostWebSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect(() => {
            console.log('Disconnected from WebSocket');
        });
    }
};
