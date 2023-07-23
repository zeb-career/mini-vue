import { h, ref } from "../../lib/my-mini-vue.esm.js";

export const App = {
  name: "App",
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value++
    }
    return {
      count,
      onClick
    };
  },
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
      },
      [
        h('div', {}, `count: ${this.count}`),
        h('button', {
          onClick: this.onClick,
        }, 'click')
      ]
    );
  },

};
