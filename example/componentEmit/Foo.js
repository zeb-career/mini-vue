import { h } from "../../lib/my-mini-vue.esm.js";


export const Foo = {
  setup(props, { emit }) {

    const emitAdd = () => {
      console.log('emitAdd')
      emit('add', 1, 2)
      emit('add-foo')
    }

    return {
      emitAdd
    }
  },
  render() {
    const btn = h("button", {
      onClick: this.emitAdd
    }, "emitAdd")

    const foo = ("p", {}, 'foo')
    return h('div', {}, [foo, btn])
  },
}