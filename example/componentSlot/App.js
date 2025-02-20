import { h, createTextVNode } from "../../lib/my-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {

  render() {
    const app = h('div', {}, "App")
    // const foo = h(Foo, {}, h('p', {}, "123"))
    // const foo = h(Foo, {}, [h('p', {}, "123"), h('p', {}, "456")])
    const foo = h(Foo, {}, {
      header: ({ age }) => [h('p', {}, "header" + age), createTextVNode('hello mini-vue')],

      footer: () => h('p', {}, "footer")
    })
    return h(
      "div",
      {},
      [app, foo]
    );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
