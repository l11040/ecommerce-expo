// 브릿지 핸들러 함수 타입
export type BridgeHandler<TParams = unknown, TResult = unknown> = (
  params: TParams
) => Promise<TResult>;

// 핸들러 맵 타입 (핸들러 이름 -> 핸들러 함수)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BridgeHandlerMap = Record<string, BridgeHandler<any, any>>;

// WebView에서 Native로 보내는 요청 메시지 타입
export type NativeMessage<T = unknown> = {
  type: "request";
  handlerName: string;
  requestId: string;
  data?: T;
};

// Native에서 WebView로 보내는 응답 메시지 타입
export type NativeResponse<T = unknown> = {
  requestId: string;
  isSuccess: boolean;
  result?: T;
};
