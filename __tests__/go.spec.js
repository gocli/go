const Go = require('../go')

describe('Go', () => {
  it('is a function', () => {
    expect(typeof Go).toBe('function')
  })

  it('can have instances', () => {
    expect(Go()).toBeInstanceOf(Go)
    expect(new Go()).toBeInstanceOf(Go)
  })
})

describe('Go instance', () => {
  it('can be patched with a plugin function only once', () => {
    const go = Go()
    const plugin = jest.fn()

    go.use(plugin)
    expect(plugin).toHaveBeenLastCalledWith(go, {})

    go.use(plugin)
    expect(plugin.mock.calls.length).toBe(1)
  })

  it('can be patched with a plugin function with options', () => {
    const go = Go()
    const plugin = jest.fn()

    go.use(plugin, { prop: 'value' })
    expect(plugin).toHaveBeenLastCalledWith(go, { prop: 'value' })
  })

  it('can be patched with a plugin object', () => {
    const go = Go()
    const plugin = { install: jest.fn() }

    go.use(plugin, { prop: 'value' })
    expect(plugin.install).toHaveBeenLastCalledWith(go, { prop: 'value' })
  })

  it('can check if plugin is installed', () => {
    const go = Go()
    const plugin = jest.fn()

    go.use(plugin)
    expect(go.isUsed(plugin)).toBeTruthy()
    expect(go.isUsed({ install: plugin })).toBeTruthy()
  })

  it('throws if methods are called not on Go instance', () => {
    const go = Go()

    expect(() => go.use.call(null)).toThrowError('should be called on instance of Go')
    expect(() => go.isUsed.call(null)).toThrowError('should be called on instance of Go')
  })

  it('throws if plugin is not a function or does not have install function', () => {
    const go = Go()

    expect(() => go.use('not a function')).toThrow()
    expect(() => go.use({})).toThrow()
  })
})
