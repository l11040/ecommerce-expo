import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const devServerIP = Constants.expoConfig?.hostUri?.split(":")[0];
const uri = __DEV__ ? `http://${devServerIP}:3000` : "http://13.209.80.253";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView source={{ uri }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
