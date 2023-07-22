import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  const { type, shapeFlags } = vnode

  switch (type) {
    case Fragment:
      procoessFragment(vnode, container)
      break
    case Text:
      procoessText(vnode, container)
      break
    default:
      if (shapeFlags & ShapeFlags.ELEMENT) {
        processElement(vnode, container)
      } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
      }
      break
  }

}


function procoessFragment(vnode: any, container: any) {
  mountChildren(vnode, container)
}

function procoessText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.type))
  const { shapeFlags, children, props } = vnode

  if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }
  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(initialVnode, container) {
  // 1. 创建组件实例
  const instance = createComponentInstance(initialVnode);
  // 2. 创建组件的render方法
  setupComponent(instance);
  // 3. 执行render方法
  setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance: any, initialVnode: any, container: any) {
  const { proxy } = instance
  // 虚拟节点树
  const subTree = instance.render.call(proxy);
  // 4. 将subTree挂载到container上
  patch(subTree, container);

  // element->mount
  initialVnode.el = subTree.el
} 