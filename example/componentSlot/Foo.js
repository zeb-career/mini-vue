import { h, renderSlots } from "../../lib/my-mini-vue.esm.js";

export const Foo = {
  setup(props) {
  },
  render() {
    const foo = h('p', {}, "foo")
    const age = 18
    return h('div', {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer")
    ])
  },
}