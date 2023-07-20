import { h } from '../../lib/my-mini-vue.esm.js'

export const App = {
  render() {
    return h("div", {
      id: 'root',
      class: ['red', 'hard']

    },
      `hi, ${this.msg}`);
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
