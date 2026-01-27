import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNativeBridge } from "../bridge/useNativeBridge";

// const devServerIP = Constants.expoConfig?.hostUri?.split(":")[0];
const uri = __DEV__ ? `http://localhost:3000` : "http://13.209.80.253";

export function WebViewContainer() {
  const { webViewRef, handleMessage } = useNativeBridge();

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      style={styles.webview}
      onMessage={handleMessage}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
