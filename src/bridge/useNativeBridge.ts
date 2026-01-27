import { useRef, useCallback } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { handlers } from "./handlers";
import { NativeMessage, NativeResponse } from "./types";

/**
 * WebView-Native 브릿지 훅
 * WebView에서 오는 요청을 처리하고 응답을 전송한다
 */
export function useNativeBridge() {
  const webViewRef = useRef<WebView>(null);

  // WebView로 응답 전송
  const sendResponse = useCallback(<T>(response: NativeResponse<T>) => {
    webViewRef.current?.postMessage(JSON.stringify(response));
  }, []);

  // WebView에서 오는 메시지 처리
  const handleMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      const message: NativeMessage = JSON.parse(event.nativeEvent.data);
      const { type, handlerName, requestId, data } = message;

      // request 타입만 처리
      if (type !== "request") {
        return;
      }

      // 핸들러 조회
      const handler = handlers[handlerName];
      if (!handler) {
        sendResponse({
          requestId,
          isSuccess: false,
          result: `Unknown handler: ${handlerName}`,
        });
        return;
      }

      // 핸들러 실행 및 응답 전송
      try {
        const result = await handler(data);
        sendResponse({ requestId, isSuccess: true, result });
      } catch (error) {
        sendResponse({
          requestId,
          isSuccess: false,
          result: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    [sendResponse]
  );

  return {
    webViewRef,
    handleMessage,
  };
}
