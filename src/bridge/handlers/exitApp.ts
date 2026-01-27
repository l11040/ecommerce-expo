import { BackHandler } from "react-native";
import { BridgeHandler } from "../types";

// 앱 종료
export const exitAppHandler: BridgeHandler<void> = async () => {
  BackHandler.exitApp();
  return { success: true };
};
