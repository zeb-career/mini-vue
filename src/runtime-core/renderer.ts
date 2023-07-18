import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  processComponent(vnode, container);
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  // 1. 创建组件实例
  const instance = createComponentInstance(vnode);
  // 2. 创建组件的render方法
  setupComponent(instance);
  // 3. 执行render方法
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
  // 虚拟节点树
  const subTree = instance.render();
  // 4. 将subTree挂载到container上
  patch(subTree, container);
}