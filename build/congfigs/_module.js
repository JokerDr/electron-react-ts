const jsRules = require('./rules/js-rules');
const styleRules = require('./rules/style-rules');
const imgRules = require('./rules/img-rules')

module.exports = {
    rules: [
        ...jsRules,
        ...styleRules,
        ...imgRules,
    ]
}