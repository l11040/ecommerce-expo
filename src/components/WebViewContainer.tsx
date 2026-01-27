import Constants from "expo-constants";
import { StyleSheet, useColorScheme } from "react-native";
import { WebView } from "react-native-webview";
import { useNativeBridge } from "../bridge/useNativeBridge";

const devServerIP = Constants.expoConfig?.hostUri?.split(":")[0];
const uri = __DEV__ ? `http://${devServerIP}:3000` : "http://13.209.80.253";

export function WebViewContainer() {
  const { webViewRef, handleMessage } = useNativeBridge();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#060606" : "#ffffff";

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      style={[styles.webview, { backgroundColor }]}
      onMessage={handleMessage}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
