import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";


export function createRenderer(options) {
  const {
    createElement,
    patchProp,
    insert
  } = options

  function render(vnode, container) {
    patch(vnode, container, null);
  }


  function patch(vnode, container, parentComponent) {
    const { type, shapeFlags } = vnode

    switch (type) {
      case Fragment:
        procoessFragment(vnode, container, parentComponent)
        break
      case Text:
        procoessText(vnode, container)
        break
      default:
        if (shapeFlags & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent)
        } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
        break
    }

  }


  function procoessFragment(vnode: any, container: any, parentComponent) {
    mountChildren(vnode, container, parentComponent)
  }

  function procoessText(vnode: any, container: any) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
  }

  function processElement(vnode: any, container: any, parentComponent) {
    mountElement(vnode, container, parentComponent)
  }

  function mountElement(vnode, container, parentComponent) {


    const el = (vnode.el = createElement(vnode.type))
    const { shapeFlags, children, props } = vnode

    if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }

    for (const key in props) {
      const val = props[key]

      patchProp(el, key, val)
    }

    insert(el, container)
  }



  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => {
      patch(v, container, parentComponent)
    })
  }

  function processComponent(vnode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(initialVnode, container, parentComponent) {
    // 1. 创建组件实例
    const instance = createComponentInstance(initialVnode, parentComponent);
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
    patch(subTree, container, instance);

    // element->mount
    initialVnode.el = subTree.el
  }


  return {
    createApp: createAppAPI(render)
  }
}
