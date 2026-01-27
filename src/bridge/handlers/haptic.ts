import * as Haptics from "expo-haptics";
import { BridgeHandler } from "../types";

type HapticStyle = "light" | "medium" | "heavy" | "success" | "warning" | "error";

type HapticParams = {
  style?: HapticStyle;
};

const impactStyles = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const notificationTypes = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

export const hapticHandler: BridgeHandler<HapticParams> = async ({
  style = "light",
}) => {
  if (style in impactStyles) {
    await Haptics.impactAsync(impactStyles[style as keyof typeof impactStyles]);
  } else if (style in notificationTypes) {
    await Haptics.notificationAsync(
      notificationTypes[style as keyof typeof notificationTypes]
    );
  }

  return { success: true };
};
