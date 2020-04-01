module.exports = {
  "plugins": [
    [
      "@babel/plugin-transform-runtime", { "corejs": 2 }
    ],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-transform-literals",
    "babel-plugin-emotion",
  ],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "babel-preset-gatsby", { "targets": { "browsers": [">0.25%", "not dead"] } }
    ],
    "@emotion/babel-preset-css-prop"
  ],
  "env": {
    "production": {},
    "development": {},
    "test": {}
  }
};
