import { createVNode } from "./vnode";

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先转换成vnode
        // component -> vnode
        const vnode = createVNode(rootComponent);
        // vnode -> dom
        render(vnode, rootContainer);
      }
    }
  }
}
