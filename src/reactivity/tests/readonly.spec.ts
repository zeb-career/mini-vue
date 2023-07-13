import { readonly, isReadonly } from "../reactive"

describe("readonly", () => {
  it('make nested values readonly', () => {
    const original = {
      foo: 1, bar: { baz: 2 }
    }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
  })

  it('warn then call set', () => {

    console.warn = jest.fn();
    const user = readonly({
      age: 10
    })
    user.age = 11

    expect(console.warn).toBeCalled()
  })
})