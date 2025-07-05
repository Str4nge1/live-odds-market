import { useEffect, useRef, useState } from "react";
import type { WebSocketOptions, WebSocketStatus } from "@types";
import { WebSocketStatusEnum } from "@enums";

const useWebSocket = <T = unknown>({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
}: WebSocketOptions<T>) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatusEnum.CONNECTING
  );

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setStatus(WebSocketStatusEnum.CONNECTED);
      onOpen?.();
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as T;
        onMessage(data);
      } catch (error) {
        console.error("Failed to parse message:", error);
        onError?.(error as Event);
      }
    };

    socketRef.current.onerror = (error) => {
      setStatus(WebSocketStatusEnum.ERROR);
      onError?.(error);
    };

    socketRef.current.onclose = () => {
      setStatus(WebSocketStatusEnum.DISCONNECTED);
      onClose?.();
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url, onMessage, onError, onOpen, onClose]);

  return {
    status,
    isError: status === WebSocketStatusEnum.ERROR,
    isConnecting: status === WebSocketStatusEnum.CONNECTING,
    isConnected: status === WebSocketStatusEnum.CONNECTED,
    isDisconnected: status === WebSocketStatusEnum.DISCONNECTED,
  };
};

export default useWebSocket;
