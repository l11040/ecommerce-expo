import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebViewContainer } from "../src/components/WebViewContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebViewContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
