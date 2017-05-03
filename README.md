# html2react-loader

![NPM version](https://badge.fury.io/js/html2react-loader.svg)
![Downloads](http://img.shields.io/npm/dm/html2react-loader.svg?style=flat)

html code to React code for webpack and other plugin.

## Install

```
npm install html2react-loader --save-dev
```

## How to use

```js
module.exports = {
  entry: ["./entry.js"],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'html2react'
    }]
  }
};
```

## LICENSE

MIT