import { BridgeHandlerMap } from "../types";
import { exitAppHandler } from "./exitApp";
import { hapticHandler } from "./haptic";
import { openAuthSessionHandler } from "./openAuthSession";
import { openExternalUrlHandler } from "./openExternalUrl";

// 브릿지 핸들러 등록
// 새 핸들러 추가 시 여기에 등록
export const handlers: BridgeHandlerMap = {
  exitApp: exitAppHandler,
  haptic: hapticHandler,
  openAuthSession: openAuthSessionHandler,
  openExternalUrl: openExternalUrlHandler,
};
