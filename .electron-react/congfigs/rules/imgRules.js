
const imgRules = [

];

const targets = {
  main:imgRules,
  renderer: imgRules,
  web: imgRules,
}

module.exports = (target) => targets[target];
