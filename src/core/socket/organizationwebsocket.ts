import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

import { FCConfig } from '../FCConfig';

let stompClient: Client | null = null;

export const connectOrganizationWebSocket = (onMessageReceived: (message: string) => void) => {
    const socket = new SockJS(FCConfig.WS_URL);
    stompClient = Stomp.over(socket);
    stompClient.debug = (msg) => console.log('STOMP Debug:', msg);

    stompClient.connect(
        {},
        () => {
            console.log('Connected to WebSocket');
            stompClient!.subscribe('/topic/organization-notifications', (message) => {
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

export const disconnectOrganizationWebSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect(() => {
            console.log('Disconnected from WebSocket');
        });
    }
};
