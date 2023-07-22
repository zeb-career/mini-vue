import { h } from "../../lib/my-mini-vue.esm.js";
import { Foo } from "./Foo.js";


export const App = {
  setup() {
    return {
      msg: "mini-vue",
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      [
        h('div', { class: 'red' }, `hi, ${this.msg}`),
        h(Foo, {
          count: 1,
          onAdd(a, b) {
            console.log('onAdd', a, b)
          },
          onAddFoo() {
            console.log('onAddFoo')
          }
        })
      ]
    );
  },
};
