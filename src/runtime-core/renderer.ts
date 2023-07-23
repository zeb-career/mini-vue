import { effect } from "../reactivity/effect";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";


export function createRenderer(options) {
  const {
    createElement: hostCreateElemnet,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options

  function render(vnode, container) {
    patch(null, vnode, container, null);
  }


  function patch(n1, n2, container, parentComponent) {
    const { type, shapeFlags } = n2

    switch (type) {
      case Fragment:
        procoessFragment(n1, n2, container, parentComponent)
        break
      case Text:
        procoessText(n1, n2, container)
        break
      default:
        if (shapeFlags & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
        break
    }

  }


  function procoessFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function procoessText(n1, n2: any, container: any) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent)
    } else {
      patchElement(n1, n2, container)
    }
  }

  function patchElement(n1, n2, container) {
    console.log(n1, n2)
    // todo: update dom logic

  }

  function mountElement(vnode, container, parentComponent) {

    const el = (vnode.el = hostCreateElemnet(vnode.type))
    const { shapeFlags, children, props } = vnode

    if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }

    for (const key in props) {
      const val = props[key]

      hostPatchProp(el, key, val)
    }

    hostInsert(el, container)
  }



  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => {
      patch(null, v, container, parentComponent)
    })
  }

  function processComponent(n1, n2, container, parentComponent) {
    mountComponent(n2, container, parentComponent);
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
    effect(() => {

      if (!instance.isMounted) {
        const { proxy } = instance
        // 虚拟节点树
        const subTree = (instance.subTree = instance.render.call(proxy));
        // 4. 将subTree挂载到container上
        patch(null, subTree, container, instance);

        // element->mount
        initialVnode.el = subTree.el
        instance.isMounted = true
      } else {
        // update

        const { proxy } = instance
        // 虚拟节点树
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree
        instance.subscribe = subTree
        patch(prevSubTree, subTree, container, instance);

      }

    })

  }


  return {
    createApp: createAppAPI(render)
  }
}
