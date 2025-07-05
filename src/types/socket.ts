import type { WebSocketStatusEnum } from "@enums";

export type WebSocketStatus = WebSocketStatusEnum

export type WebSocketOptions<TMessage = unknown> = {
  url: string;
  onMessage: (data: TMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
};
