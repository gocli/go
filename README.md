# go <sub><sup><sub>with ease</sub></sup></sub>

CLI tool to use boilerplates in a fast and easy way.

## Installation

Currently, the package is not available on NPM, so you have to setup it manually. Choose the directory to store **go** files and follow the instruction below.

```bash
$ cd /storage/for/go/package
$ git clone git@github.com:termosa/go.git ./
$ npm install
$ npm link
```

Then you need to reload shell settings. The easiest way is to open a new terminal window.

## Usage

```bash
# Setup boilerplate from https://github.com/vuejs-templates/simple to the ./simple directory
$ go vuejs-templates/simple
> Code is ready! Check it in the "simple" directory.

# Create alias for easier usage
$ go alias wp-theme-html5 zencoder/html5-boilerplate-for-wordpress
> wp-theme-html5 is aliased with "zencoder/html5-boilerplate-for-wordpress"

# Setup wp-theme-html5 to the ./template directory
$ go wp-theme-html5 ./template
> Code is ready! Check it in the "./template" directory.

# See all aliases
$ go alias
>  Aliases list
> wp-theme-html5:  zencoder/html5-boilerplate-for-wordpress
```

# Compability with [Go language](https://golang.org/)

You don't need to worry about the intersection with Go Lang CLI tool. **[go](https://github.com/termosa/go)** will manage that for you in a smart way: whenever you run **go** command in your shell, it will determine if this command is related to the Go Lang, and if it is **go** will forward the execution to it.

Even more, you can create aliases for Go Lang CLI:

```bash
$ go alias main build main.go
$ go main
$ ./main
```

## License

MIT © [Stanislav Termosa](https://github.com/termosa)
