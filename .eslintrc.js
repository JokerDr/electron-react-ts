module.exports = {
    "env": {
        "browser": true,
        // "es6": true,
        "node": true
    },
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        "airbnb",
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
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        "allowUnderscorePrefix": "error",
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        'typescript/class-name-casing': 'error',
        "@typescript-eslint/no-empty-interface": [
          "warn",
        ]
    }
};
