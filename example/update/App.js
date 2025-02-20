import { h, ref } from "../../lib/my-mini-vue.esm.js";

export const App = {
  name: "App",
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value++
    }
    const props = ref({
      foo: "foo",
      bar: "bar"
    })

    const onChangePropsDemo1 = () => {
      props.value.foo = 'new-foo'
    }
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: "foo"
      }
    }
    return {
      count,
      onClick,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
      props
    };
  },
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        ...this.props
      },
      [
        h('div', {}, `count: ${this.count}`),
        h('button', {
          onClick: this.onClick,
        }, 'click'),
        h('button', {
          onClick: this.onChangePropsDemo1,
        }, 'changeProps - 值改变了 - update'),
        h('button', {
          onClick: this.onChangePropsDemo2,
        }, 'changeProps - 值改变了 foot=undefined - delete foo'),
        h('button', {
          onClick: this.onChangePropsDemo3,
        }, 'changeProps - 值改变了 去除bar - delete bar'),
      ]
    );
  },

};
