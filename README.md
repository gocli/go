# go <sub><sup><sub>with ease</sub></sup></sub> <sub><sup><sub>[![npm](https://img.shields.io/npm/v/go.svg?style=flat-square)](https://www.npmjs.com/package/go)</sub></sup></sub>

Go is the toolset to manage boilerplates with less effort.

## Usage

```bash
$ npm install --save-dev go
# or
$ npm install --global go
```

## Plugins

Without plugins Go has two features methods:

1. `go.use(plugin[, options])` - to register plugin
2. `go.isUsed(plugin)` - to check if plugin is registered

The plugin is either a function, or an object with `install` method that will be called with the prototype object, and with given options. This way Go features are extended:

```js
const go = require('go')

const plugin = (proto) => { proto.log = console.log.bind(console) }
// or
const plugin = { install: (proto) => { proto.log = console.log.bind(console) }}

go.use(plugin)

go.log('Hello, Go!')
```

Several plugins are bundled with Go:

- [go-plugin-cli](https://www.npmjs.com/package/go-plugin-cli) - register and execute commands.
- [go-plugin-fs](https://www.npmjs.com/package/go-plugin-fs) - work with files and folders
- [go-plugin-quiz](https://www.npmjs.com/package/go-plugin-quiz) - collect user input
- [go-plugin-handlebars](https://www.npmjs.com/package/go-plugin-handlebars) - process templates

## CLI tool

To use Go abilities from CLI — [go-cli](https://www.npmjs.com/package/go-cli) is installed with the package. This tool can trigger commands registered with [go-plugin-cli](https://www.npmjs.com/package/go-plugin-cli).

```js
// gofile.js
const go = require('go')

go.registerCommand('ping', () => { console.log('pong') })
```

```bash
$ go ping
pong
```

If you don't want to install Go globally, you can run it using [npx](https://www.npmjs.com/package/npx) (it is bundled with >= npm@5.2) or with [npm scripts](https://docs.npmjs.com/misc/scripts).

## Examples

### Using go-cli to execute tasks

```js
// goifle.js
const go = require('go')

go.registerCommand('install', async () => {
  if (await go.confirm('run installation?')) {
    console.log('running')
  }
})
```

```bash
$ go install
```

### Generating app components

```bash
.
├── gofile.js
└── .templates/
    └── component.js
└── app/
    ├── components/
    └── main.js
```

```js
// gofile.js
const go = require('go')

const prepareName = name => name.toLowerCase().replace(/[^a-z\d]/ig, '-')

go.registerCommand('create', async (argv) => {
  const type = argv._[1] // extract word after `create` command
  if (type !== 'component') throw `${type} is not suppoted`

  // try to extract name from arguments or ask to enter it
  const name = argv.name || await go.ask({
    message: 'name the component',
    default: 'new-component',
    validate: (input) => input.trim() ? true : 'component name can not be empty'
  })
  const fileName = prepareName(name)
  go.processTemplate('component.js', `components/${fileName}.js`)
})
```

```bash
$ go create component
# or
$ go create component --name my-component
```

## License

MIT © [Stanislav Termosa](https://github.com/termosa)

