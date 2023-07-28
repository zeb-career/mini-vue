import { h, ref } from "../../lib/my-mini-vue.esm.js";
export const Child = {
  name: "child",
  setup(props, { emit }) {

    return {

    }
  },
  render() {
    return h("div", {}, [
      h("div", {}, "child - props - msg:" + this.$props.msg)
    ])
  },
}