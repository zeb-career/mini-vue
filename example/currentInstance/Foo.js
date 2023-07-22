import { h, getCurrentInstance } from "../../lib/my-mini-vue.esm.js";


export const Foo = {
  setup() {
    const instance = getCurrentInstance()
    console.log("Foo:", instance)
  },
  render() {
    const foo = ("p", {}, 'foo')
    return h('div', {}, foo)
  },
}