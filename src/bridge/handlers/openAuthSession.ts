import {
  openAuthSessionAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { BridgeHandler } from "../types";

type OpenAuthSessionParams = {
  url: string;
  callbackUrl: string;
  presentationStyle?: "fullScreen" | "pageSheet";
};

type OpenAuthSessionResult = {
  success: boolean;
  url?: string;
  error?: string;
};

// OAuth 인증 세션 열기
// 콜백 URL로 리다이렉트되면 자동으로 브라우저 닫고 URL 반환
export const openAuthSessionHandler: BridgeHandler<
  OpenAuthSessionParams,
  OpenAuthSessionResult
> = async ({ url, callbackUrl, presentationStyle = "pageSheet" }) => {
  const result = await openAuthSessionAsync(url, callbackUrl, {
    presentationStyle:
      presentationStyle === "fullScreen"
        ? WebBrowserPresentationStyle.FULL_SCREEN
        : WebBrowserPresentationStyle.PAGE_SHEET,
  });

  if (result.type === "success") {
    return { success: true, url: result.url };
  }

  if (result.type === "cancel") {
    return { success: false, error: "cancelled" };
  }

  return { success: false, error: "unknown" };
};
