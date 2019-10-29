module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      'plugin:react/recommended',
      "prettier",
      "prettier/@typescript-eslint",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            'impliedStrict':true
        },
        "ecmaVersion": 2019,
        "sourceType": 'module'
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'eqeqeq': [ // 全等 === ！==
            'error',
            'always',
            {
                'null': 'ignore'
            }
        ],
        'curly': "error", //  控制快风格一致
        'camelcase': "error", // 駝峰命名
        'no-multiple-empty-lines': "error", // 禁止多行空行
        '@typescript-eslint/no-explicit-any': 'off', // any类型
        '@typescript-eslint/no-empty-interface': 'off', // 接口内容为空
        '@typescript-eslint/interface-name-prefix': [
          'error',
          { 'prefixWithI': "always" }
        ],
        '@typescript-eslint/no-unused-vars': [
          "error",
          {
            "vars": "all",
            "args": "none",
            "ignoreRestSiblings": false
          }
        ]
    }
};
