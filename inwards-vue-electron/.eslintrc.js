module.exports = {
  // https://eslint.org/docs/user-guide/configuring#using-configuration-files-1
  root: true,

  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    node: true
  },

  // https://eslint.org/docs/user-guide/configuring#specifying-parser
  parser: 'vue-eslint-parser',

  // https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: latest,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true
  }
  },

  // https://eslint.org/docs/user-guide/configuring#extending-configuration-files
  // order matters: from least important to most important in terms of overriding
  // Prettier + Vue: https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
    'standard'
  ],
  globals: {
    __static: true
  },
  // https://eslint.org/docs/user-guide/configuring#configuring-plugins
  plugins: ['vue', '@typescript-eslint', 'prettier'],

  rules: {
    'semi': [2, "always"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
}
