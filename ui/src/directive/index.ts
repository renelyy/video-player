import type { App } from "vue";

import { hasPerm } from "./permission";
import { throttle } from "./throttle";
import { copy } from "./copy";
import { lazy } from "./lazy"

// 全局注册 directive
export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有组件中都可用
  app.directive("hasPerm", hasPerm);

  app.directive("throttle", throttle);

  app.directive("copy", copy);

  app.directive("lazy", lazy);
}
