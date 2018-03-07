This plugin demonstrates the basics of using [wp.data](https://github.com/WordPress/gutenberg/tree/master/data) - the Redux-abstraction in Gutenberg. This is based on the [counter example](https://github.com/reactjs/redux/tree/master/examples/counter) in [Redux](https://redux.js.org/). It is "translated into WordPress" to show how these concepts overlap.


There are two blocks. One shows the count, the other has a plus/minus button. Simple, but illustrates cross-block communication in the editor, which is neato.

## Development
This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

Below you will find some information on how to run scripts.

### 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

