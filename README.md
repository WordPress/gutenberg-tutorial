# Learn Gutenberg Example: Working With Block Attributes
This plugin demonstrates a Gutenberg block that saves static HTML and sets its attributes based on that HTML. This plugin illustrates some advanced concepts of [block attributes](https://wordpress.org/gutenberg/handbook/block-api/attributes/).
Block Attributes and Saving Data

> Want to learn more about Gutenberg development?
> [This is plugin is example code for the tutorial "Block Attributes and Saving Data".](https://learn.wordpress.org)


## Development
This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block). 

You can just install this plugin and it will work.  If you want to modify this plugin, you need to use [npm](https://npmjs.com).

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