const jsRules = require('./rules/jsRules');
const styleRules = require('./rules/styleRules');
const imgRules = require('./rules/imgRules');
const fileRules = require('./rules/fileRules');

module.exports = {
    rules: [
        ...jsRules,
        ...styleRules,
        ...imgRules,
        ...fileRules,
    ]
}