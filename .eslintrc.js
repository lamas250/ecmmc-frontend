module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "globals": {
      "wat": false,
      "localStorage": false,
      "document": false,
      "window": false,
      "alert": false
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/prop-types": "off",
      "no-case-declarations": "off",
      "no-unused-vars": 0
    }
};
