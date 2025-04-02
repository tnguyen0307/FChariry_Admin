import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";

let stompClient: Client | null = null;

export const connectWebSocket = (onMessageReceived: (message: string) => void) => {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);
  stompClient.debug = (msg) => console.log("STOMP Debug:", msg);

  stompClient.connect({}, () => {
    console.log("Connected to WebSocket");
    stompClient!.subscribe("/topic/notifications", (message) => {
      if (message.body) {
        onMessageReceived(message.body);
      }
    });
  }, (error) => {
    console.error("WebSocket connection error:", error);
  });
};

export const disconnectWebSocket = () => {
  if (stompClient !== null) {
    stompClient.disconnect(() => {
      console.log("Disconnected from WebSocket");
    });
  }
};