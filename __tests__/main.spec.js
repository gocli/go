const go = require('../index')

describe('main', () => {
  it('is exports an object', () => {
    expect(typeof go).toBe('object')

    expect(go).toHaveProperty('getCommands')
    expect(go).toHaveProperty('matchCommand')
    expect(go).toHaveProperty('executeCommand')
    expect(go).toHaveProperty('registerCommand')

    expect(go).toHaveProperty('fs')
    expect(go).toHaveProperty('copy')
    expect(go).toHaveProperty('copySync')
    expect(go).toHaveProperty('move')
    expect(go).toHaveProperty('moveSync')
    expect(go).toHaveProperty('remove')
    expect(go).toHaveProperty('removeSync')
    expect(go).toHaveProperty('writeFile')
    expect(go).toHaveProperty('writeFileSync')
    expect(go).toHaveProperty('readFile')
    expect(go).toHaveProperty('readFileSync')
    expect(go).toHaveProperty('createDir')
    expect(go).toHaveProperty('createDirSync')

    expect(go).toHaveProperty('inquirer')
    expect(go).toHaveProperty('ask')
    expect(go).toHaveProperty('confirm')
    expect(go).toHaveProperty('registerQuestion')

    expect(go).toHaveProperty('createTemplate')
    expect(go).toHaveProperty('loadTemplates')
    expect(go).toHaveProperty('loadTemplates.sync')
    expect(go).toHaveProperty('processTemplates')
    expect(go).toHaveProperty('processTemplates.sync')
  })
})
