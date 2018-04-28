# Learn Gutenberg Example: Communicating Between Blocks

This plugin demonstrates the basics of using [wp.data](https://github.com/WordPress/gutenberg/tree/master/data) - the Redux-abstraction in Gutenberg. This is based on the [counter example](https://github.com/reactjs/redux/tree/master/examples/counter) in [Redux](https://redux.js.org/). It is "translated into WordPress" to show how these concepts overlap.

There are two blocks. One shows the count, the other has a plus/minus button. Simple, but illustrates cross-block communication in the editor, which is neato.

> Want to learn more about Gutenberg development?
> [This is plugin is example code for the tutorial "Advanced Topics In Block Development".](https://learn.wordpress.org)

## Are You New New to WordPress or Gutenberg?

[What Is Gutenberg?](https://wordpress.org/gutenberg)

For a quick start guide to WordPress development with Gutenberg: [The Gutenberg Handbook](https://wordpress.org/gutenberg/handbook/)

For a deep dive into extending Gutenberg and block development: [Developer’s Guide to the Block Editor](https://learn.wordpress.org)

Do you learn by reading code? [Fork this repo to get 10+ example plugins and a theme to learn from, experiment with and make your own](https://github.com/WordPress/gutenberg-tutorial/fork).


## Development
This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

This plugin should just work, since the built CSS and JavaScript files are committed to the directory `dist`. If you want to modify this plugin, you need to use [npm](https://npmjs.com).

Below you will find some information on how to use npm scripts to develop this plugin.

### Install NPM
- Makes sure [NodeJS and NPM](https://nodejs.org/) are installed by running `node -v` or `npm -v` to check their versions.
- Switch to this directory. 
- Install node dependencies by running `node install` or `sudo node install`

### Development Scripts

#### `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

#### `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

#### `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

## License
Like WordPress, this code is licensed under the terms of the GNU General Public License Version 2 or greater. __Please__ feel [free](https://wordpress.org/about/philosophy#gpl) to modify, reuse, or redistribute this code. That's what is here for.
