import { openBrowserAsync } from "expo-web-browser";
import { BridgeHandler } from "../types";

type OpenExternalUrlParams = {
  url: string;
};

// 인앱 브라우저로 URL 열기 (iOS: SFSafariViewController, Android: Chrome Custom Tabs)
export const openExternalUrlHandler: BridgeHandler<
  OpenExternalUrlParams
> = async ({ url }) => {
  await openBrowserAsync(url);
  return { success: true };
};
