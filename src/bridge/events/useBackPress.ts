import { useEffect } from "react";
import { BackHandler } from "react-native";

type SendEventFn = <T>(eventName: string, data?: T) => void;

// Android 백 버튼 이벤트를 WebView로 전달
export function useBackPress(sendEvent: SendEventFn) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      sendEvent("nativeBackPress");
      return true; // 기본 동작 방지 (앱 종료 방지)
    });

    return () => backHandler.remove();
  }, [sendEvent]);
}
