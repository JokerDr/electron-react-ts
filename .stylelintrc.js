
module.exports = {
  processors: [],
  plugins: [],
  extends: "stylelint-config-standard", // 这是官方推荐的方式
  rules: {
    "at-rule-empty-line-before": "always",  //规则前必须添加空行
    "at-rule-name-case": "lower",  // 规则名必须都是小写字母
    "block-no-empty": true,
  }
};