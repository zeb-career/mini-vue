import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootComponent) {
      // 先转换成vnode
      // component -> vnode
      const vnode = createVNode(rootComponent);
      // vnode -> dom
      render(vnode, rootComponent);
    }
  }
}
