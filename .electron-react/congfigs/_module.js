const jsRules = require('./rules/jsRules');
const styleRules = require('./rules/styleRules');
const imgRules = require('./rules/imgRules');
const fileRules = require('./rules/fileRules');


module.exports = (target) => ({
  rules: [
      ...jsRules(target),
      ...styleRules(target),
      ...imgRules(target),
      ...fileRules(target),
  ]
})
