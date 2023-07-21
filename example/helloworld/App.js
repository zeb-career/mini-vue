import { h } from "../../lib/my-mini-vue.esm.js";
import { Foo } from "./Foo.js";


window.self = null
export const App = {
  name: "App",
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log('click')
        },
        onMousedown() {
          console.log('mousedown')
        }
      },
      // `hi, ${this.msg}`
      // [
      //   h('p', { class: 'red' }, 'hi'),
      //   h('p', { class: 'blue' }, 'mini-vue')
      // ]
      [
        h('div', { class: 'red' }, `hi, ${this.msg}`),
        h(Foo, { count: 1 })
      ]
    );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
