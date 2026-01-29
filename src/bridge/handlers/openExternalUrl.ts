import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { BridgeHandler } from "../types";

type OpenExternalUrlParams = {
  url: string;
  presentationStyle?: "fullScreen" | "pageSheet";
};

// 인앱 브라우저로 URL 열기 (iOS: SFSafariViewController, Android: Chrome Custom Tabs)
export const openExternalUrlHandler: BridgeHandler<
  OpenExternalUrlParams
> = async ({ url, presentationStyle = "pageSheet" }) => {
  await openBrowserAsync(url, {
    presentationStyle:
      presentationStyle === "fullScreen"
        ? WebBrowserPresentationStyle.FULL_SCREEN
        : WebBrowserPresentationStyle.PAGE_SHEET,
  });
  return { success: true };
};
